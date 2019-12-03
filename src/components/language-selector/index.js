import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeLocale } from '../../i18n';
import StyledSelect from './styled/select';

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
];

function LanguageSelector(props) {
    const {
        locale,
        onChangeLanguage,
        style,
        className,
    } = props;

    const handleLanguageChange = (event) => {
        onChangeLanguage(event.target.value);
    };

    return (
        <StyledSelect
            label="Language Selector"
            hideLabel
            style={style}
            options={languages}
            value={locale}
            onChange={handleLanguageChange}
            className={className} />
    );
}

LanguageSelector.propTypes = {
    locale: PropTypes.string,
    onChangeLanguage: PropTypes.func,
    style: PropTypes.object,
    className: PropTypes.string,
};

LanguageSelector.defaultProps = {
    locale: 'en',
    onChangeLanguage: () => {},
    style: {},
    className: undefined,
};

function stateToProps(state) {
    const { i18n } = state;
    return {
        locale: i18n.locale,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        onChangeLanguage: (locale) => dispatch(changeLocale(locale)),
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(LanguageSelector);
