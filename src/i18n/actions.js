import {
    isValidLocale,
    saveUserLocale,
} from './utils';

export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export function changeLocale(locale) {
    if (isValidLocale(locale)) {
        saveUserLocale(locale);
        return {
            type: CHANGE_LOCALE,
            locale,
        };
    }
    // eslint-disable-next-line no-console
    console.error(`The locale passed  "${locale}" is not supported.`);
    return undefined;
}
