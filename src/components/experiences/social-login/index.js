import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import Button from 'react-rainbow-components/components/Button';
import FacebookIcon from './icons/facebookIcon';
import GoogleIcon from './icons/googleIcon';
import { loginWithFacebook } from '../../../redux/actions/authentication';
import './styles.css';

function SocialLogin(props) {
    const {
        loginWithFacebook,
        isLoadingFacebook,
    } = props;
    return (
        <article className="rainbow-auth-firebase-social-login_buttons-container">
            <Button
                className="rainbow-auth-firebase-social-login_button rainbow-auth-firebase-social-login_facebook-button"
                onClick={loginWithFacebook}
                isLoading={isLoadingFacebook}>
                <FacebookIcon className="rainbow-auth-firebase-social-login_social-icon" />
                <FormattedMessage id="facebook.button.login" defaultMessage="Login with Facebook" />
            </Button>
            <Button variant="neutral" className="rainbow-auth-firebase-social-login_button" onClick={() => {}}>
                <GoogleIcon className="rainbow-auth-firebase-social-login_social-icon" />
                Login with Google
            </Button>
        </article>
    );
}

SocialLogin.propTypes = {
    loginWithFacebook: PropTypes.func.isRequired,
    isLoadingFacebook: PropTypes.bool.isRequired,
};

function stateToProps(state) {
    const { authentication } = state;
    return {
        isLoadingFacebook: authentication.get('isLoadingFacebook'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        loginWithFacebook,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(SocialLogin);
