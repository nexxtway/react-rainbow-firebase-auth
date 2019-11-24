const localStoreI18nLocale = 'rainbow-firebase-auth-i18n-user-locale';
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
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
        return browserLang.split('-')[0];
    }
    return 'es';
}

export function getNavigatorLanguages() {
    const navigatorLanguages = navigator.languages;
    const isEnSupported = navigatorLanguages.includes('en');
    const isEsSupported = navigatorLanguages.includes('es');
    return {
        en: isEnSupported,
        es: isEsSupported,
    };
}
