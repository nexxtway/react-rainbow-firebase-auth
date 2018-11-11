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
import { loginWithEmailAndPassword, resetAuthForm } from '../../../../redux/actions/authentication';
import LockIcon from '../../../icons/lock/index.js';
import SocialLogin from '../../../experiences/social-login';
import './styles.css';
import './media-queries.css';
import EmailIcon from '../../../icons/email';
import validate from './validate';

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

class SignIn extends Component {
    componentDidMount() {
        const { resetAuthForm } = this.props;
        resetAuthForm();
    }

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
                    <Card className="rainbow-auth-firebase-signin_card">
                        <SocialLogin />
                        <article className="rainbow-auth-firebase-signin_inputs-container">
                            <Field
                                component={Input}
                                name="email"
                                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(translations.emailPlaceholder)}
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
                    <Link className="rainbow-auth-firebase-signin_link" to="/home/signup">
                        <FormattedMessage
                            id="sign.up"
                            defaultMessage="Sign up?" />
                    </Link>
                </section>
            </form>
        );
    }
}

SignIn.propTypes = {
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    resetAuthForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    intl: intlShape.isRequired,
};

SignIn.defaultProps = {
    className: undefined,
    style: undefined,
};

function stateToProps(state) {
    return state.authentication.toJS();
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        loginWithEmailAndPassword,
        resetAuthForm,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'signin',
        touchOnBlur: false,
        validate,
    })(injectIntl(SignIn)),
);
