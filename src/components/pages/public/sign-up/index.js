/* eslint-disable max-len */
import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {
    FormattedMessage,
    injectIntl,
    intlShape,
    defineMessages,
} from 'react-intl';
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import Select from 'react-rainbow-components/components/Select';
import SocialLogin from '../../../experiences/social-login';
import EmailIcon from '../../../icons/email/index.js';
import LockIcon from '../../../icons/lock/index.js';
import UserIcon from '../../../icons/user/index.js';
import { loginWithFacebook } from '../../../../redux/actions/authentication';
import { createAccount } from '../../../../redux/actions/registration';
import validate from './validate';
import TermsConditionsAndPrivacyPolicy from '../../../experiences/termsConditions-and-privacyPolicy/idnex';
import { changeLocale } from '../../../../i18n';
import './styles.css';
import './media-queries.css';

const translations = defineMessages({
    usernamePlaceholder: {
        id: 'form.username.placeholder',
        defaultValue: 'Enter your user name',
    },
    emailPlaceholder: {
        id: 'form.email.placeholder',
        defaultValue: 'Enter your email address',
    },
    passwordPlaceholder: {
        id: 'form.password.placeholder',
        defaultValue: 'Enter your password',
    },
});

const languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
];

class SignUp extends Component {
    getClassName() {
        const { className } = this.props;
        return classnames('rainbow-auth-firebase-signup_container', className);
    }

    render() {
        const {
            handleSubmit,
            isLoading,
            createAccount,
            style,
            intl,
            changeLocale,
            locale,
        } = this.props;

        return (
            <form noValidate onSubmit={handleSubmit(createAccount)}>
                <section className={this.getClassName()} style={style}>
                    <Link to="/home">
                        <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="rainbow-auth-firebase-signup_image" />
                    </Link>
                    <p className="rainbow-auth-firebase-signup_header">
                        <FormattedMessage id="form.create.account" defaultMessage="Create Account" />
                    </p>
                    <p className="rainbow-auth-firebase-signup_have-account">
                        <FormattedMessage id="login.do.you.have.account" defaultMessage="Already have an account?" />
                        <span>{' '}</span>
                        <Link className="rainbow-auth-firebase-signup_link" to="/home/signin">
                            <FormattedMessage id="login.here" defaultMessage="Login here" />
                        </Link>
                    </p>
                    <Card className="rainbow-auth-firebase-signup_card">
                        <SocialLogin />
                        <article className="rainbow-auth-firebase-signup_inputs-container">

                            <Field
                                component={Input}
                                name="name"
                                label={<FormattedMessage id="form.username.label" defaultMessage="User name" />}
                                required
                                placeholder={intl.formatMessage(translations.usernamePlaceholder)}
                                icon={<UserIcon />} />
                            <Field
                                component={Input}
                                name="email"
                                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                                type="email"
                                icon={<EmailIcon />} />
                            <Field
                                component={Input}
                                name="password"
                                label={<FormattedMessage id="form.password.label" defaultMessage="Password" />}
                                placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                                type="password"
                                required
                                icon={<LockIcon />} />
                            <Button
                                variant="brand"
                                type="submit"
                                label={<FormattedMessage id="login.to.signup" defaultMessage="Create Account" />}
                                isLoading={isLoading}
                            />
                        </article>
                    </Card>
                    <TermsConditionsAndPrivacyPolicy />
                    <Select
                        className="rainbow-auth-firebase-signup-language"
                        options={languages}
                        value={locale}
                        onChange={(event) => changeLocale(event.target.value)} />
                </section>
            </form>
        );
    }
}

SignUp.propTypes = {
    createAccount: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    intl: intlShape.isRequired,
    changeLocale: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
};

SignUp.defaultProps = {
    className: undefined,
    style: {},
};

function stateToProps(state) {
    const { registration, authentication } = state;
    const { i18n } = state;
    return {
        locale: i18n.locale,
        isLoading: registration.get('isLoading'),
        errorMessage: registration.get('errorMessage'),
        isLoadingFacebook: authentication.get('isLoadingFacebook'),
        facebookErrorMessage: authentication.get('facebookErrorMessage'),
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        loginWithFacebook,
        createAccount,
        changeLocale,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'signup',
        touchOnBlur: false,
        validate,
    })(injectIntl(SignUp)),
);
