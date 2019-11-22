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
    defineMessages,
} from 'react-intl';
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import Select from 'react-rainbow-components/components/Select';
import { changeLocale } from '../../../../i18n';
import { loginWithEmailAndPassword } from '../../../../redux/actions/authentication';
import LockIcon from '../../../icons/lock/index.js';
import SocialLogin from '../../../experiences/social-login';
import EmailIcon from '../../../icons/email';
import validate from './validate';
import TermsConditionsAndPrivacyPolicy from '../../../experiences/termsConditions-and-privacyPolicy/idnex';
import './styles.css';
import './media-queries.css';

const translations = defineMessages({
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

class SignIn extends Component {
    getClassName() {
        const { className } = this.props;
        return classnames('rainbow-auth-firebase-signin_container', className);
    }

    render() {
        const {
            handleSubmit,
            loginWithEmailAndPassword,
            isLoading,
            style,
            intl,
            changeLocale,
            locale,
        } = this.props;

        return (
            <form noValidate onSubmit={handleSubmit(user => loginWithEmailAndPassword(user))}>
                <section className={this.getClassName()} style={style}>
                    <Link to="/home">
                        <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="rainbow-auth-firebase-signin_image" />
                    </Link>
                    <p className="rainbow-auth-firebase-signin_header">
                        <FormattedMessage
                            id="form.sign.in"
                            defaultMessage="Sign in" />
                    </p>
                    <p className="rainbow-auth-firebase-signin_do-not-have-account">
                        <FormattedMessage id="login.do.not.have.account" defaultMessage="Don’t have an account?" />
                        <span>{' '}</span>
                        <Link className="rainbow-auth-firebase-signin_link" to="/home/signup">
                            <FormattedMessage id="sign.up" defaultMessage="Create Account here" />
                        </Link>
                    </p>
                    <Card className="rainbow-auth-firebase-signin_card">
                        <SocialLogin />
                        <article className="rainbow-auth-firebase-signin_inputs-container">
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
                                label={<FormattedMessage id="login.to.login" defaultMessage="Login" />}
                                isLoading={isLoading}
                            />
                            <Link to="/home/forgot-password" className="rainbow-auth-firebase-signin_link">
                                <FormattedMessage
                                    id="form.sing.in.forgot.password"
                                    defaultMessage="Forgot your password?" />
                            </Link>
                        </article>
                    </Card>
                    <TermsConditionsAndPrivacyPolicy />
                    <Select
                        className="rainbow-auth-firebase-signin-language"
                        options={languages}
                        value={locale}
                        onChange={event => changeLocale(event.target.value)} />
                </section>
            </form>
        );
    }
}

SignIn.propTypes = {
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    intl: PropTypes.object.isRequired,
    changeLocale: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
};

SignIn.defaultProps = {
    className: undefined,
    style: undefined,
};

function stateToProps(state) {
    const { i18n } = state;
    return {
        ...state.authentication.toJS(),
        locale: i18n.locale,
    };
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        loginWithEmailAndPassword,
        changeLocale,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'signin',
        touchOnBlur: false,
        validate,
    })(injectIntl(SignIn)),
);
