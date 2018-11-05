import { resolveLocale } from './utils';
import localeData from './translations.json';
import { CHANGE_LOCALE } from './actions';

const locale = resolveLocale();
const initialState = {
    locale,
    messages: localeData[locale],
};

function changeLocale(state, toLocale) {
    return {
        ...state,
        locale: toLocale,
        messages: localeData[toLocale],
    };
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_LOCALE:
            return changeLocale(state, action.locale);
        default:
            return state;
    }
}
