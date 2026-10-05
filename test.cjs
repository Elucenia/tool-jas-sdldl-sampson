'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict'),api=require('./calculator.js'),vectors=require('./examples.json'),provenance=require('./provenance.json');
const sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
for(const [file,hash]of Object.entries(provenance.packageImplementationFiles))assert.equal(sha(fs.readFileSync(path.join(__dirname,file))),hash,'Pinned packaged source '+file);
let numericOutputs=0,domainRejections=0,inputRejections=0,localeNumericalComparisons=0,conditionChecks=0;
const results=[];
for(const c of vectors){
 const output=api.calculate(c.input),expected=c.expected;
 if(expected.expectedRejection){assert(output.error,c.label+' must reject');if(c.kind==='mathematical-domain')domainRejections++;else inputRejections++;results.push({label:c.label,kind:c.kind,passed:true,obtainedRejection:output.code});continue;}
 assert(!output.error,c.label+' '+output.error);const rounded=typeof expected.expectedRounded==='number'?{value:expected.expectedRounded}:expected.expectedRounded;
 for(const [key,value]of Object.entries(rounded))assert.equal(output.canonicalResult[key],value,c.label+' '+key);numericOutputs++;
 for(const locale of api.locales){
  const localized=api.calculate(c.input,locale);assert(!localized.error,c.label+' '+locale);assert.deepEqual(localized.canonicalResult,output.canonicalResult);
  for(const item of localized.display.entries){assert.equal(api.parseLocalizedDecimal(item.text,locale),item.value);assert(item.label&&item.unit);}
  const encoded=Object.fromEntries(Object.entries(c.input).map(([key,value])=>[key,typeof value==='number'||typeof value==='string'&&/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value)?api.localeNumberFormat(locale,{useGrouping:false,maximumFractionDigits:20}).format(Number(value)):value]));
  const replay=api.calculateLocalized(encoded,locale);assert(!replay.error,c.label+' localized '+locale);assert.deepEqual(replay.canonicalResult,output.canonicalResult,c.label+' localized canonical equality '+locale);localeNumericalComparisons++;
 }
 results.push({label:c.label,kind:c.kind,passed:true,expected:rounded,obtained:Object.fromEntries(Object.keys(rounded).map(k=>[k,output.canonicalResult[k]]))});
}
for(const locale of api.locales){
 const t=api.presentation(locale),source=api.presentation('pt-BR').display.fields;
 assert.equal(t.locale,locale);assert.equal(t.display.fieldLocale,locale);assert(t.display.methodVersion&&t.display.sources.length&&t.display.formula&&t.display.limits);assert.equal(t.clinicalApproval,'not-performed');assert.equal(t.professionalLanguageApproval,'not-performed');
 assert.deepEqual(t.display.fields.map(([key,,kind,options])=>[key,kind,options.min??null,options.max??null,Object.keys(options.opts??{})]),source.map(([key,,kind,options])=>[key,kind,options.min??null,options.max??null,Object.keys(options.opts??{})]));
 for(const malformed of ['', '1_000', '1.2.3', '<script>1</script>'])assert(!Number.isFinite(api.parseLocalizedDecimal(malformed,locale))||api.parseLocalizedDecimal(malformed,locale)===null);
 if(api.metadata.id==='niddk-egfr')for(const [name,m]of Object.entries(require('./method.cjs').METHODS)){
  const contract=api.fieldContract({method:name,unit:'mg/dL'},locale),keys=contract.map(f=>f[0]),age=contract.find(f=>f[0]==='age')[3];assert.equal(age.min,m.minAge);assert.equal(age.max,m.maxAge);assert.equal(keys.includes('creatinine'),!!m.cr);assert.equal(keys.includes('unit'),!!m.cr);assert.equal(keys.includes('cystatin'),!!m.cys);assert.equal(keys.includes('height'),!!m.height);for(const f of contract.filter(f=>['creatinine','unit','cystatin','height'].includes(f[0])))assert.equal(f[3].opt,false);conditionChecks++;
 }
 if(api.metadata.id==='jas-sdldl-sampson')for(const mode of ['direct','panel']){const fields=api.fieldContract({mode},locale),keys=fields.map(f=>f[0]);assert.equal(keys.includes('ldlMgDl'),mode==='direct');assert.equal(keys.includes('tcMgDl'),mode==='panel');assert.equal(keys.includes('hdlMgDl'),mode==='panel');for(const f of fields.filter(f=>['ldlMgDl','tcMgDl','hdlMgDl'].includes(f[0])))assert.equal(f[3].opt,false);conditionChecks++;}
}
const summary={id:api.metadata.id,cases:vectors.length,numericOutputs,mathematicalDomainRejections:domainRejections,inputValidationRejections:inputRejections,localeNumericalComparisons,conditionalFieldContracts:conditionChecks,failed:0,independentExpectedValues:'Pinned historical Decimal60 source-derived vectors; fresh package replay, not a new independent oracle',clinicalApproval:'not-performed',professionalLanguageApproval:'not-performed'};
if(process.argv.includes('--record'))fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify({at:new Date().toISOString(),summary,results},null,2)+'\n');
console.log(JSON.stringify(summary));
