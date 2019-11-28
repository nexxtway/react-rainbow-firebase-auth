import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import { loginWithFacebook, loginWithGoogle } from '../../../redux/actions/authentication';
import { changeLocale } from '../../../i18n';
import StyledArticle from './styled/article';
import StyledSelect from './styled/select';
import StyledLoginButton from './styled/loginButton';
import StyledFacebookButton from './styled/facebookButton';
import StyledIcon from './styled/icon';
import GoogleIcon from './icons/googleIcon';
import FacebookIcon from './icons/facebookIcon';

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
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
                    <StyledIcon as={GoogleIcon} />
                    <FormattedMessage id="google.button.login" defaultMessage="Login with Google" />
                </StyledLoginButton>
            </div>
            <StyledSelect
                options={languages}
                value={locale}
                onChange={(event) => changeLocale(event.target.value)} />
        </StyledArticle>
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
