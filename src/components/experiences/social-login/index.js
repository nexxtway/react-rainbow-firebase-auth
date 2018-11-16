import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Button from 'react-rainbow-components/components/Button';
import Select from 'react-rainbow-components/components/Select';
import FacebookIcon from './icons/facebookIcon';
import GoogleIcon from './icons/googleIcon';
import { loginWithFacebook, loginWithGoogle } from '../../../redux/actions/authentication';
import { changeLocale } from '../../../i18n';
import './styles.css';

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
];

function SocialLogin(props) {
    const {
        loginWithFacebook,
        isLoadingFacebook,
        loginWithGoogle,
        isLoadingGoogle,
        changeLocale,
        locale,
    } = props;
    return (
        <article className="rainbow-auth-firebase-social-login_buttons-container">
            <div>
                <Button
                    className="rainbow-auth-firebase-social-login_button rainbow-auth-firebase-social-login_facebook-button"
                    onClick={loginWithFacebook}
                    isLoading={isLoadingFacebook}>
                    <FacebookIcon className="rainbow-auth-firebase-social-login_social-icon" />
                    <FormattedMessage id="facebook.button.login" defaultMessage="Login with Facebook" />
                </Button>
                <Button
                    variant="neutral"
                    className="rainbow-auth-firebase-social-login_button"
                    onClick={loginWithGoogle}
                    isLoading={isLoadingGoogle}>
                    <GoogleIcon className="rainbow-auth-firebase-social-login_social-icon" />
                    <FormattedMessage id="google.button.login" defaultMessage="Login with Google" />
                </Button>
            </div>
            <Select
                className="rainbow-auth-firebase-social-language"
                options={languages}
                value={locale}
                onChange={event => changeLocale(event.target.value)} />
        </article>
    );
}

SocialLogin.propTypes = {
    loginWithFacebook: PropTypes.func.isRequired,
    isLoadingFacebook: PropTypes.bool.isRequired,
    loginWithGoogle: PropTypes.func.isRequired,
    isLoadingGoogle: PropTypes.bool.isRequired,
    changeLocale: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,

};

function stateToProps(state) {
    const { authentication, i18n } = state;
    return {
        isLoadingFacebook: authentication.get('isLoadingFacebook'),
        isLoadingGoogle: authentication.get('isLoadingGoogle'),
        locale: i18n.locale,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        loginWithFacebook,
        loginWithGoogle,
        changeLocale,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(SocialLogin);
