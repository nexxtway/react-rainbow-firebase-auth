import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
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
    componentDidMount() {
        const { reset } = this.props;
        reset();
    }

    getClassName() {
        const { className } = this.props;
        return classnames('rainbow-auth-firebase-signup_container', className);
    }

    signup(user) {
        const { createAccount } = this.props;
        createAccount(user);
    }

    render() {
        const {
            handleSubmit,
            isLoading,
            createAccount,
            style,
        } = this.props;

        return (
            <form noValidate onSubmit={handleSubmit((user) => { createAccount(user); })}>
                <section className={this.getClassName()} style={style}>
                    <Link to="/home">
                        <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="rainbow-auth-firebase-signup_image" />
                    </Link>
                    <p className="rainbow-auth-firebase-signup_header">Sign up</p>
                    <Card className="rainbow-auth-firebase-signup_card">
                        <SocialLogin />
                        <article className="rainbow-auth-firebase-signup_inputs-container">

                            <Field
                                component={Input}
                                name="username"
                                label="Username"
                                required
                                placeholder="Enter your username"
                                icon={<UserIcon />} />
                            <Field
                                component={Input}
                                name="email"
                                label="Email Address"
                                required
                                placeholder="Enter your email address"
                                icon={<EmailIcon />} />
                            <Field
                                component={Input}
                                name="password"
                                label="Password"
                                placeholder="Enter your password"
                                type="password"
                                required
                                icon={<LockIcon />} />
                            <Button
                                variant="brand"
                                type="submit"
                                label="Create Account"
                                onClick={handleSubmit((user) => { createAccount(user); })}
                                isLoading={isLoading}
                            />
                            <p className="rainbow-auth-firebase-signup_terms-conditions">
                                By creating an account you agree to our Terms and
                                Conditions and our Privacy Policy.
                            </p>
                        </article>
                    </Card>
                    <Link className="rainbow-auth-firebase-signup_link" to="/home/signin">Sign in?</Link>
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
        validate,
    })(SignUp),
);
