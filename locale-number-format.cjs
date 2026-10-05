"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiNumberingSystem = uiNumberingSystem;
exports.localeNumberFormat = localeNumberFormat;
exports.localeDateTimeFormat = localeDateTimeFormat;
// ELUCENIA display convention: deterministic native Arabic digits; Latin digits in the other nine UI locales.
// Intl still determines localized separators, wording and precision from the unchanged caller options.
function uiNumberingSystem(locale) { return locale.split('-')[0].toLowerCase() === 'ar' ? 'arab' : 'latn'; }
function localeNumberFormat(locale, options = {}) { return new Intl.NumberFormat(locale, { ...options, numberingSystem: uiNumberingSystem(locale) }); }
function localeDateTimeFormat(locale, options = {}) { return new Intl.DateTimeFormat(locale, { ...options, numberingSystem: uiNumberingSystem(locale) }); }
