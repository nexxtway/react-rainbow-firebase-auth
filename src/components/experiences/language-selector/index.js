import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-rainbow-components/components/Select';
import { changeLocale } from '../../../i18n';
import './styles.css';

const languageOptions = [
    {
        value: 'en',
        label: 'English',
    },
    {
        value: 'es',
        label: 'Español',
    },
];

function LanguageSelector(props) {
    const {
        locale,
        onChangeLanguage,
    } = props;

    const handleLanguageChange = (event) => {
        onChangeLanguage(event.target.value);
    };

    return (
        <Select
            options={languageOptions}
            value={locale}
            onChange={handleLanguageChange}
            className="rainbow-auth-firebase_language-selector" />
    );
}

LanguageSelector.propTypes = {
    locale: PropTypes.string,
    onChangeLanguage: PropTypes.func,
};

LanguageSelector.defaultProps = {
    locale: 'en',
    onChangeLanguage: () => {},
};

function stateToProps(state) {
    const { i18n } = state;
    return {
        locale: i18n.locale,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeLanguage: locale => dispatch(changeLocale(locale)),
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(LanguageSelector);
