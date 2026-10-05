/* Copyright (c) 2026 ELUCENIA · Felipe Guedes. Apache-2.0. */
'use strict';
const fs=require('node:fs'),api=require('./calculator.js');
const args=process.argv.slice(2);let locale='pt-BR',localized=false;
try{
 for(let i=0;i<args.length;i++){if(args[i]==='--locale'){locale=args[++i];if(!api.locales.includes(locale))throw Error('UNSUPPORTED_LOCALE');}else if(args[i]==='--localized')localized=true;else throw Error('Usage: node cli.cjs [--locale en] [--localized] < input.json');}
 const bytes=fs.readFileSync(0);if(bytes.length>65536)throw Error('INPUT_TOO_LARGE');const input=JSON.parse(bytes.toString('utf8'));
 const output=localized?api.calculateLocalized(input,locale):api.calculate(input,locale);process.stdout.write(JSON.stringify(output,null,2)+'\n');if(output.error)process.exitCode=1;
}catch(error){process.stderr.write(error.message+'\n');process.exitCode=1;}
