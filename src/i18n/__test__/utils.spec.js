import { resolveLocale } from '../utils';

const { localStorage } = global;

describe('i18n module', () => {
    describe('#resolveLocale()', () => {
        it('should return "es" locale if there is nothing in the storage', () => {
            global.localStorage = { getItem: () => undefined };
            expect(resolveLocale()).toBe('es');
        });

        it('should return default locale "es" if what is in the storage locale is invalid', () => {
            global.localStorage = { getItem: () => 'abcd' };
            expect(resolveLocale()).toBe('es');
        });
    });

    afterAll(() => {
        global.localStorage = localStorage;
    });
});
