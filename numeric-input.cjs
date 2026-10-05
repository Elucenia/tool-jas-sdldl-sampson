"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLocalizedDecimal = parseLocalizedDecimal;
exports.requiredDecimal = requiredDecimal;
const locale_number_format_1 = require("./locale-number-format.cjs");
function normalizedDigits(raw) {
    return raw.normalize('NFKC')
        .replace(/[٠-٩]/g, digit => String(digit.charCodeAt(0) - 0x660))
        .replace(/[۰-۹]/g, digit => String(digit.charCodeAt(0) - 0x6f0))
        .replace(/[०-९]/g, digit => String(digit.charCodeAt(0) - 0x966))
        .replace(/\u066b/g, ',')
        .replace(/\u2212/g, '-')
        .replace(/[\u061c\u200e\u200f]/g, '');
}
/** Parse locale grouping and decimal notation; blank and malformed values are never zero. */
function parseLocalizedDecimal(raw, locale) {
    let normalized = normalizedDigits(raw.trim());
    if (!normalized)
        return null;
    if (locale) {
        const format = (0, locale_number_format_1.localeNumberFormat)(locale);
        const parts = format.formatToParts(123456789.5);
        const group = normalized.includes('٬') ? '٬' : normalizedDigits(parts.find(part => part.type === 'group')?.value || '');
        const decimal = raw.includes('٫') ? ',' : normalizedDigits(parts.find(part => part.type === 'decimal')?.value || '.');
        if (group && normalized.includes(group)) {
            const unsigned = normalized.replace(/^[+-]/, '');
            const pieces = unsigned.split(decimal);
            // The comma is also accepted as an ungrouped decimal on dot-decimal
            // keyboards. A valid locale group, however, always retains its meaning.
            const integer = pieces[0], groups = integer.split(group);
            const integers = parts.filter(part => part.type === 'integer').map(part => normalizedDigits(part.value));
            const middleSize = integers.length > 2 ? integers[integers.length - 2].length : 3;
            const grouped = groups.length > 1 && /^[1-9]\d*$/.test(groups[0]) && groups[0].length <= middleSize &&
                groups.slice(1, -1).every(part => new RegExp('^\\d{' + middleSize + '}$').test(part)) && /^\d{3}$/.test(groups.at(-1) || '') &&
                pieces.length <= 2 && (pieces.length === 1 || /^\d+$/.test(pieces[1]));
            if (grouped)
                normalized = normalized.split(group).join('').replace(decimal, '.');
            else if (groups.length > 2 || pieces.length > 2 || group === ' ' || group === '٬' ||
                groups.length === 2 && /^\d{3}$/.test(groups[1]) && groups[0] !== '0')
                return NaN;
        }
    }
    if (!/^[+-]?\d+(?:[.,]\d+)?$/.test(normalized))
        return NaN;
    return Number(normalized.replace(',', '.'));
}
function requiredDecimal(data, name, min, max, locale) {
    const value = data.get(name);
    const parsed = parseLocalizedDecimal(typeof value === 'string' ? value : '', locale);
    if (parsed === null || !Number.isFinite(parsed) || parsed < min || parsed > max) {
        throw new RangeError(name);
    }
    return parsed;
}
