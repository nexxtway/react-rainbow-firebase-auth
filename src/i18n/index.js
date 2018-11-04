import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import { connect } from 'react-redux';
import reducer from './reducer';

addLocaleData([...en, ...es]);

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
