const localStoreI18nLocale = 'ponlaya-i18n-user-locale';
const validUserLocales = {
    en: true,
    es: true,
};

export function isValidLocale(locale) {
    return !!validUserLocales[locale];
}

function getUserLocale() {
    const userLocale = localStorage.getItem(localStoreI18nLocale);
    if (userLocale && isValidLocale(userLocale)) {
        return userLocale;
    }
    return undefined;
}

export function saveUserLocale(locale) {
    localStorage.setItem(localStoreI18nLocale, locale);
}

export function resolveLocale() {
    const userLocale = getUserLocale();
    if (userLocale) {
        return userLocale;
    }

    return 'es';
}
