import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from 'react-rainbow-components/components/Button';
import FacebookIcon from './icons/facebookIcon';
import GoogleIcon from './icons/googleIcon';
import AmazonIcon from './icons/amazonIcon';
import {loginWithFacebook} from '../../../redux/actions/authentication';
import './styles.css';

function SocialLogin(props) {
    const {
        loginWithFacebook,
        isLoadingFacebook,
    } = props;
    return (
        <article className="aws-amplify-app-social-login_buttons-container">
            <Button
                className="aws-amplify-app-social-login_button aws-amplify-app-social-login_facebook-button"
                onClick={loginWithFacebook}
                isLoading={isLoadingFacebook}>
                <FacebookIcon className="aws-amplify-app-social-login_social-icon" />
                Login with Facebook
            </Button>
            <Button variant="neutral" className="aws-amplify-app-social-login_button" onClick={() => {}}>
                <GoogleIcon className="aws-amplify-app-social-login_social-icon" />
                Login with Google
            </Button>
            <Button
                variant="neutral"
                className="aws-amplify-app-social-login_button aws-amplify-app-social-login_amazon-button"
                onClick={() => {}}>
                <AmazonIcon className="aws-amplify-app-social-login_social-icon" />
                Login with Amazon
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
