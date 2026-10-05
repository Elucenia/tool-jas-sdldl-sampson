// ELUCENIA display convention: deterministic native Arabic digits; Latin digits in the other nine UI locales.
// Intl still determines localized separators, wording and precision from the unchanged caller options.
export function uiNumberingSystem(locale:string):'arab'|'latn'{return locale.split('-')[0].toLowerCase()==='ar'?'arab':'latn';}
export function localeNumberFormat(locale:string,options:Intl.NumberFormatOptions={}):Intl.NumberFormat{return new Intl.NumberFormat(locale,{...options,numberingSystem:uiNumberingSystem(locale)});}
export function localeDateTimeFormat(locale:string,options:Intl.DateTimeFormatOptions={}):Intl.DateTimeFormat{return new Intl.DateTimeFormat(locale,{...options,numberingSystem:uiNumberingSystem(locale)});}
