/* Copyright (c) 2026 ELUCENIA · Felipe Guedes. Apache-2.0 for ELUCENIA code; scientific sources retain their rights. */
'use strict';
const method=require('./method.cjs'),metadata=require('./tool.json').tool;
const {parseLocalizedDecimal}=require('./numeric-input.cjs'),{localeNumberFormat}=require('./locale-number-format.cjs');
const locales=['pt-BR','en','es','fr','de','it','ar','zh','ja','hi'];
function presentation(locale){if(!locales.includes(locale))throw new RangeError('UNSUPPORTED_LOCALE');return require('./localization/'+locale+'.json');}
function fieldContract(input={},locale='pt-BR'){
 const display=presentation(locale).display,fields=JSON.parse(JSON.stringify(display.fields));
 if(metadata.id==='niddk-egfr'){
  const selected=method.METHODS[input?.method];
  return fields.filter(([key])=>!['creatinine','unit','cystatin','height'].includes(key)||Boolean(selected&&(key==='unit'||key==='creatinine'?selected.cr:key==='cystatin'?selected.cys:selected.height))).map(f=>{
   const options=f[3]??(f[3]={});if(f[0]==='age'&&selected){options.min=selected.minAge;options.max=selected.maxAge;}
   if(['creatinine','unit','cystatin','height'].includes(f[0]))options.opt=false;
   if(f[0]==='creatinine')options.max=input.unit==='umol/L'?1768:20;
   return f;
  });
 }
 if(metadata.id==='jas-sdldl-sampson')return fields.filter(([key])=>key!=='ldlMgDl'&&key!=='tcMgDl'&&key!=='hdlMgDl'||(input?.mode==='direct'?key==='ldlMgDl':input?.mode==='panel'?key!=='ldlMgDl':false)).map(f=>{if(['ldlMgDl','tcMgDl','hdlMgDl'].includes(f[0]))f[3].opt=false;return f;});
 return fields;
}
function parseInput(input,locale='pt-BR'){
 if(!input||typeof input!=='object'||Array.isArray(input))throw new RangeError('INVALID_INPUT');
 const parsed={};for(const [key,,kind,options={}]of fieldContract(input,locale)){
  const value=input[key];if(value==null||value===''){if(options.opt)continue;throw new RangeError(key);}
  if(kind==='num'){
   const numeric=typeof value==='number'?value:typeof value==='string'?parseLocalizedDecimal(value,locale):NaN;
   if(!Number.isFinite(numeric)||numeric<options.min||numeric>options.max)throw new RangeError(key);parsed[key]=numeric;
  }else{if(!Object.hasOwn(options.opts??{},value))throw new RangeError(key);parsed[key]=value;}
 }
 return parsed;
}
function calculate(input,locale='pt-BR'){
 const pack=presentation(locale),tool=pack.display,terms=pack.terms;
 try{
  const raw=method.estimate(input),format=value=>localeNumberFormat(locale,{useGrouping:false,minimumFractionDigits:1,maximumFractionDigits:1}).format(value);
  const exact=value=>{const found=tool.resultLabels?.[value]??tool.resultValues?.[value]??tool.resultUnits?.[value];if(typeof found==='string')return found;if(locale==='pt-BR')return value;throw Error('MISSING_AUTHORED_PRESENTATION');};
  const entries=[{key:'value',label:exact(raw.methodLabel||raw.method),value:raw.value,text:format(raw.value),unit:exact(raw.unit)}];
  for(const [key,label,unit]of [['bmi','bmiResult','kg/m²'],['sodiumMmolDay','sodiumResult',terms.mmolDay],['predictedCreatinineMgDay','creatinineResult',terms.mgDay],['ldlMgDl','ldlResult','mg/dL'],['largeBuoyantMgDl','largeBuoyantResult','mg/dL']])if(typeof raw[key]==='number')entries.push({key,label:terms[label],value:raw[key],text:format(raw[key]),unit});
  const ldlMethod=raw.ldlMethod==='Sampson–NIH 2020 (painel lipídico)'?terms.sampsonPanel:raw.ldlMethod==='LDL-C medido informado'?terms.measuredLdlProvided:raw.ldlMethod?exact(raw.ldlMethod):null;
  return{id:metadata.id,locale,canonicalResult:raw,display:{title:tool.title,method:entries[0].label,entries,limits:exact(raw.limitations),ldlMethod},provenance:{methodVersion:tool.methodVersion,implementationVersion:metadata.implementationVersion,sourceIds:metadata.sourceIds},clinicalApproval:'not-performed',professionalLanguageApproval:'not-performed'};
 }catch(error){return{id:metadata.id,locale,error:pack.shared.invalid,code:'INVALID_INPUT',...(error.field?{canonicalField:error.field}:{}),clinicalApproval:'not-performed',professionalLanguageApproval:'not-performed'};}
}
function calculateLocalized(input,locale='pt-BR'){try{return calculate(parseInput(input,locale),locale);}catch{return{id:metadata.id,locale,error:presentation(locale).shared.invalid,code:'INVALID_INPUT',clinicalApproval:'not-performed',professionalLanguageApproval:'not-performed'};}}
module.exports={metadata,locales,presentation,fieldContract,parseInput,calculate,calculateLocalized,parseLocalizedDecimal,localeNumberFormat};
