/* eslint-disable no-restricted-properties,no-underscore-dangle */
import { resolveLocale } from '../utils';

const { localStorage } = global;

describe('i18n module', () => {
    describe('#resolveLocale()', () => {
        it('should return "es" locale if there is nothing in the storage and no browser language', () => {
            global.localStorage = { getItem: () => undefined };
            navigator.__defineGetter__('language', () => undefined);
            navigator.__defineGetter__('userLanguage', () => undefined);
            expect(resolveLocale()).toBe('es');
        });

        it('should return "es" if what is in the storage locale is invalid and no browser language', () => {
            global.localStorage = { getItem: () => 'abcd' };
            navigator.__defineGetter__('language', () => undefined);
            navigator.__defineGetter__('userLanguage', () => undefined);
            expect(resolveLocale()).toBe('es');
        });
        it('should return "en" using navigator first lang-option if there is nothing in the storage', () => {
            global.localStorage = { getItem: () => 'abcd' };
            navigator.__defineGetter__('language', () => 'en');
            navigator.__defineGetter__('userLanguage', () => undefined);
            expect(resolveLocale()).toBe('en');
        });
        it('should return "en" using navigator second lang-option if there is nothing in the storage', () => {
            global.localStorage = { getItem: () => 'abcd' };
            navigator.__defineGetter__('language', () => undefined);
            navigator.__defineGetter__('userLanguage', () => 'en');
            expect(resolveLocale()).toBe('en');
        });
    });

    afterAll(() => {
        global.localStorage = localStorage;
    });
});
