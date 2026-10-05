/* Copyright (c) 2026 ELUCENIA · Felipe Guedes. Apache-2.0. No remote calculator/API. */
(function(){'use strict';
 const api=globalThis.EluceniaTool,form=document.getElementById('form'),result=document.getElementById('result'),error=document.getElementById('error'),selector=document.getElementById('language');
 const names={'pt-BR':'Português (Brasil)',en:'English',es:'Español',fr:'Français',de:'Deutsch',it:'Italiano',ar:'العربية',zh:'中文',ja:'日本語',hi:'हिन्दी'};
 let locale=api.locales.includes(new URL(location.href).searchParams.get('lang'))?new URL(location.href).searchParams.get('lang'):'pt-BR';
 function node(tag,text){const el=document.createElement(tag);if(text!==undefined)el.textContent=text;return el;}
 function clear(){result.hidden=true;result.replaceChildren();error.hidden=true;error.textContent='';}
 function capture(){return Object.fromEntries(Array.from(form.elements).filter(el=>el.name).map(el=>[el.name,el.value]));}
 function render(wire={},previousLocale=locale){
  clear();const pack=api.presentation(locale),tool=pack.display,ui=pack.ui;
  document.documentElement.lang=locale;document.documentElement.dir=locale==='ar'?'rtl':'ltr';document.title=tool.title+' · ELUCENIA';selector.value=locale;selector.setAttribute('aria-label',ui.language);
  document.querySelectorAll('[data-copy]').forEach(el=>el.textContent=ui[el.dataset.copy]);document.getElementById('tool-title').textContent=tool.title;document.getElementById('scope').textContent=pack.shared.intro+' '+ui.clinical;
  form.replaceChildren();for(const [key,label,kind,options={}]of api.fieldContract(wire,locale)){
   const wrap=node('label'),caption=node('span',label);wrap.append(caption);let field;
   if(options.opts){field=node('select');const blank=node('option',pack.shared.select);blank.value='';field.append(blank);for(const [code,text]of Object.entries(options.opts)){const option=node('option',text);option.value=code;field.append(option);}}
   else{field=node('input');field.type='text';field.inputMode='decimal';}
   field.name=key;field.id='field-'+key;field.required=!options.opt;field.lang=locale;field.dir='auto';
   let value=wire[key]??'';if(kind==='num'&&value!==''&&previousLocale!==locale){const numeric=api.parseLocalizedDecimal(String(value),previousLocale);if(numeric!==null&&Number.isFinite(numeric))value=api.localeNumberFormat(locale,{useGrouping:false,maximumFractionDigits:20}).format(numeric);}field.value=value;wrap.append(field);
   const hints=[];if(options.unit)hints.push(options.unit);if(options.min!==undefined)hints.push(pack.shared.range+': '+api.localeNumberFormat(locale,{useGrouping:false,maximumFractionDigits:20}).format(options.min)+'–'+api.localeNumberFormat(locale,{useGrouping:false,maximumFractionDigits:20}).format(options.max));
   if(hints.length){const hint=node('small',hints.join(' · '));hint.id='hint-'+key;field.setAttribute('aria-describedby',hint.id);wrap.append(hint);}form.append(wrap);
  }
  const calculate=node('button',pack.shared.calculate);calculate.type='submit';const reset=node('button',pack.shared.clear);reset.type='reset';form.append(calculate,reset);
  const docs=document.getElementById('documentation');docs.replaceChildren();for(const [key,value]of [['edition',tool.methodVersion],['formula',tool.formula],['limits',tool.limits]])docs.append(node('h2',ui[key]),node('p',value));
  docs.append(node('h2',ui.references));const list=node('ol');for(const [title,url]of tool.sources){const item=node('li'),link=node('a',title);link.href=url;link.rel='noopener noreferrer';link.dir='auto';item.append(link);list.append(item);}docs.append(list);
 }
 for(const [code,name]of Object.entries(names)){const option=node('option',name);option.value=code;option.lang=code;selector.append(option);}
 selector.addEventListener('change',()=>{const wire=capture(),previous=locale;locale=selector.value;render(wire,previous);const url=new URL(location.href);url.searchParams.set('lang',locale);history.replaceState(null,'',url);});
 form.addEventListener('input',clear);form.addEventListener('change',event=>{clear();if(['method','unit','mode'].includes(event.target.name))render(capture());});form.addEventListener('reset',event=>{event.preventDefault();render();});
 form.addEventListener('submit',event=>{event.preventDefault();clear();if(!form.reportValidity())return;const output=api.calculateLocalized(capture(),locale);if(output.error){error.textContent=output.error;error.hidden=false;return;}for(const entry of output.display.entries){const paragraph=node('p');paragraph.append(node('strong',entry.label+' '),node('bdi',entry.text+' '+entry.unit));result.append(paragraph);}if(output.display.ldlMethod)result.append(node('p',output.display.ldlMethod));result.append(node('small',output.display.limits));result.hidden=false;result.focus();});
 result.tabIndex=-1;render();
})();
