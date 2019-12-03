import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { loginWithFacebook, loginWithGoogle } from '../../redux/actions/authentication';
import StyledArticle from './styled/article';
import StyledLoginButton from './styled/loginButton';
import StyledFacebookButton from './styled/facebookButton';
import StyledIcon from './styled/icon';
import FacebookIcon from './icons/facebookIcon';

function SocialLogin(props) {
    const {
        loginWithFacebook,
        isLoadingFacebook,
        loginWithGoogle,
        isLoadingGoogle,
    } = props;
    return (
        <StyledArticle>
            <div>
                <StyledFacebookButton
                    onClick={loginWithFacebook}
                    isLoading={isLoadingFacebook}>
                    <StyledIcon as={FacebookIcon} />
                    <FormattedMessage id="facebook.button.login" defaultMessage="Login with Facebook" />
                </StyledFacebookButton>
                <StyledLoginButton
                    variant="neutral"
                    onClick={loginWithGoogle}
                    isLoading={isLoadingGoogle}>
                    <StyledIcon />
                    <FormattedMessage id="google.button.login" defaultMessage="Login with Google" />
                </StyledLoginButton>
            </div>
        </StyledArticle>
    );
}

SocialLogin.propTypes = {
    loginWithFacebook: PropTypes.func.isRequired,
    isLoadingFacebook: PropTypes.bool.isRequired,
    loginWithGoogle: PropTypes.func.isRequired,
    isLoadingGoogle: PropTypes.bool.isRequired,

};

function stateToProps(state) {
    const { authentication } = state;
    return {
        isLoadingFacebook: authentication.get('isLoadingFacebook'),
        isLoadingGoogle: authentication.get('isLoadingGoogle'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        loginWithFacebook,
        loginWithGoogle,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(SocialLogin);
