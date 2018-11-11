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
import SocialLogin from '../../../experiences/social-login';
import EmailIcon from '../../../icons/email/index.js';
import LockIcon from '../../../icons/lock/index.js';
import UserIcon from '../../../icons/user/index.js';
import { loginWithFacebook } from '../../../../redux/actions/authentication';
import { createAccount, reset } from '../../../../redux/actions/registration';
import './styles.css';
import './media-queries.css';
import validate from './validate';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.translations = defineMessages({
            usernamePlaceholder: {
                id: 'form.sign.username.placeholder',
                defaultValue: 'Enter your user name',
            },
            emailPlaceholder: {
                id: 'form.sign.email.placeholder',
                defaultValue: 'Enter your email address',
            },
            passwordPlaceholder: {
                id: 'form.sign.password.placeholder',
                defaultValue: 'Enter your password',
            },
        });
    }

    componentDidMount() {
        const { reset } = this.props;
        reset();
    }

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
                                label={<FormattedMessage id="form.sign.username.label" defaultMessage="User name" />}
                                required
                                placeholder={intl.formatMessage(this.translations.usernamePlaceholder)}
                                icon={<UserIcon />} />
                            <Field
                                component={Input}
                                name="email"
                                label={<FormattedMessage id="form.sign.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(this.translations.emailPlaceholder)}
                                icon={<EmailIcon />} />
                            <Field
                                component={Input}
                                name="password"
                                label={<FormattedMessage id="form.sign.password.label" defaultMessage="Password" />}
                                placeholder={intl.formatMessage(this.translations.passwordPlaceholder)}
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
                    <p className="rainbow-auth-firebase-signup_terms-conditions">
                        <FormattedMessage id="sign.up.creating.account.agree" defaultMessage="By creating an account you agree to our" />
                        <br />
                        <Link className="rainbow-auth-firebase-signup_link" to="/home/terms">
                            <FormattedMessage id="sign.up.terms" defaultMessage="Terms and Conditions" />
                        </Link>
                        <span>{' '}</span>
                        <FormattedMessage id="sign.up.terms.and" defaultMessage="and our" />
                        <span>{' '}</span>
                        <Link className="rainbow-auth-firebase-signup_link" to="/home/privacy">
                            <FormattedMessage id="sign.up.privacy" defaultMessage="Privacy Policy" />
                        </Link>
                    </p>
                </section>
            </form>
        );
    }
}

SignUp.propTypes = {
    reset: PropTypes.func.isRequired,
    createAccount: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    intl: intlShape.isRequired,
};

SignUp.defaultProps = {
    className: undefined,
    style: {},
};

function stateToProps(state) {
    const { registration, authentication } = state;
    return {
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
        reset,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'signup',
        touchOnBlur: false,
        validate,
    })(injectIntl(SignUp)),
);
