'use strict';
// Executes the exact standalone runtime with a minimal DOM contract, plus the actual local CLI.
// This is not a native-browser/WebGL audit or a professional language/clinical signature.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),cp=require('node:child_process'),assert=require('node:assert/strict'),api=require('./calculator.js'),vectors=require('./examples.json');
class Element{
 constructor(tag){this.tagName=tag.toUpperCase();this.children=[];this.listeners={};this.attributes={};this.hidden=false;this.value='';this.name='';this.textContent='';this.dataset={};this.style={};}
 append(...children){for(const child of children){this.children.push(child);if(child&&typeof child==='object')child.parent=this;}}
 replaceChildren(...children){this.children=[];this.append(...children);}
 setAttribute(name,value){this.attributes[name]=String(value);}
 addEventListener(type,callback){(this.listeners[type]??=[]).push(callback);}
 dispatch(type,target=this){for(const callback of this.listeners[type]||[])callback({target,preventDefault(){}});}
 get elements(){const result=[];function walk(el){for(const child of el.children){if(['INPUT','SELECT','BUTTON'].includes(child.tagName))result.push(child);walk(child);}}walk(this);return result;}
 reportValidity(){return this.elements.every(el=>!el.required||el.value!=='');}
 focus(){this.focused=true;}
}
function browser(locale){
 const ids=Object.fromEntries(['form','result','error','language','tool-title','scope','documentation'].map(key=>[key,new Element(key==='form'?'form':key==='language'?'select':'section')]));
 const copies=['brand','language','record','code','cases'].map(key=>{const element=new Element('span');element.dataset.copy=key;return element;});
 const document={documentElement:new Element('html'),title:'',createElement:tag=>new Element(tag),getElementById:key=>ids[key],querySelectorAll:selector=>selector==='[data-copy]'?copies:[]};
 const context=vm.createContext({document,location:{href:'http://localhost/index.html?lang='+locale},history:{replaceState(){}},URL,Intl,console});
 vm.runInContext(fs.readFileSync(path.join(__dirname,'calculator.browser.js'),'utf8'),context,{timeout:10000});vm.runInContext(fs.readFileSync(path.join(__dirname,'demo-runtime.js'),'utf8'),context,{timeout:10000});
 return{context,document,...ids,copies};
}
function field(dom,key){return dom.form.elements.find(el=>el.name===key);}
function encodedInput(input,locale){return Object.fromEntries(Object.entries(input).map(([key,value])=>[key,typeof value==='number'||typeof value==='string'&&/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value)?api.localeNumberFormat(locale,{useGrouping:false,maximumFractionDigits:20}).format(Number(value)):value]));}
function fill(dom,input,locale){const encoded=encodedInput(input,locale);for(const key of ['method','unit','mode'])if(input[key]!==undefined){const el=field(dom,key);assert(el,'Visible selector '+key);el.value=input[key];dom.form.dispatch('change',el);}for(const [key,value]of Object.entries(encoded)){const el=field(dom,key);if(el)el.value=value;}}
const modes=api.metadata.id==='niddk-egfr'?Object.keys(require('./method.cjs').METHODS):api.metadata.id==='jas-sdldl-sampson'?['direct','panel']:['default'];
let browserSubmissions=0,localeSwitches=0,cliRuns=0,conditionalViews=0,structuralChecks=0;
for(const mode of modes){
 const example=vectors.find(c=>!c.expected.expectedRejection&&(mode==='default'||c.input.method===mode||c.input.mode===mode));assert(example);
 for(const locale of api.locales){
  const dom=browser(locale);fill(dom,example.input,locale);assert.equal(dom.document.documentElement.lang,locale);assert.equal(dom.document.documentElement.dir,locale==='ar'?'rtl':'ltr');
  const pack=api.presentation(locale),contract=api.fieldContract(example.input,locale);for(const [key,label,,options={}]of contract){const el=field(dom,key);assert(el);assert.equal(el.parent.children[0].textContent,label);assert.equal(el.required,!options.opt);if(options.opts)assert.deepEqual(el.children.slice(1).map(c=>[c.value,c.textContent]),Object.entries(options.opts));structuralChecks++;}
  dom.form.dispatch('submit');assert.equal(dom.error.hidden,true);assert.equal(dom.result.hidden,false);
  const expected=api.calculate(example.input,locale);assert(!expected.error);assert.equal(expected.canonicalResult.value,typeof example.expected.expectedRounded==='number'?example.expected.expectedRounded:example.expected.expectedRounded.value);
  assert.equal(dom.result.children[0].children[1].textContent,expected.display.entries[0].text+' '+expected.display.entries[0].unit);assert.equal(dom.result.children.at(-1).textContent,expected.display.limits);browserSubmissions++;conditionalViews++;
  const next=api.locales[(api.locales.indexOf(locale)+1)%api.locales.length];dom.language.value=next;dom.language.dispatch('change');assert.equal(dom.document.documentElement.lang,next);assert.equal(dom.result.hidden,true);dom.form.dispatch('submit');assert.equal(dom.error.hidden,true);assert.equal(dom.result.hidden,false);
  const nextOutput=api.calculate(example.input,next);assert.equal(dom.result.children[0].children[1].textContent,nextOutput.display.entries[0].text+' '+nextOutput.display.entries[0].unit);localeSwitches++;
  const command=cp.spawnSync(process.execPath,['cli.cjs','--locale',locale,'--localized'],{cwd:__dirname,input:JSON.stringify(encodedInput(example.input,locale)),encoding:'utf8',timeout:10000});assert.equal(command.status,0,command.stderr);assert.deepEqual(JSON.parse(command.stdout).canonicalResult,expected.canonicalResult);cliRuns++;
 }
}
for(const locale of api.locales){const failure=cp.spawnSync(process.execPath,['cli.cjs','--locale',locale,'--localized'],{cwd:__dirname,input:'{}',encoding:'utf8',timeout:10000});assert.equal(failure.status,1);assert.equal(JSON.parse(failure.stdout).error,api.presentation(locale).shared.invalid);cliRuns++;}
console.log(JSON.stringify({id:api.metadata.id,browserSubmissions,localeSwitches,cliRuns,conditionalViews,structuralChecks,failed:0,scope:'Exact standalone JS on a minimal deterministic DOM contract and actual local CLI; no native browser, network or professional validation',clinicalApproval:'not-performed',professionalLanguageApproval:'not-performed'}));
