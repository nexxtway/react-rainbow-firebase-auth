import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import reducer from './reducer';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/dist/locale-data/en';
import '@formatjs/intl-pluralrules/dist/locale-data/es';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-relativetimeformat/dist/locale-data/es';


const I18n = ({ locale, messages, children }) => (
    <IntlProvider locale={locale} messages={messages} key={locale}>
        {children}
    </IntlProvider>
);

I18n.propTypes = {
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object,
    children: PropTypes.object.isRequired,
};

I18n.defaultProps = {
    messages: {},
};

function stateToProps(state) {
    const { i18n: { locale, messages } } = state;
    return {
        locale,
        messages,
    };
}

function dispatchToProps() {
    return {};
}
export const i18nReducer = reducer;
export { changeLocale } from './actions';
export default connect(stateToProps, dispatchToProps)(I18n);
