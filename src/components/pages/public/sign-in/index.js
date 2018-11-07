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
import { loginWithEmailAndPassword, resetAuthForm } from '../../../../redux/actions/authentication';
import LockIcon from '../../../icons/lock/index.js';
import SocialLogin from '../../../experiences/social-login';
import './styles.css';
import './media-queries.css';
import EmailIcon from '../../../icons/email';

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
        } = this.props;

        return (
            <form noValidate onSubmit={handleSubmit(user => loginWithEmailAndPassword(user))}>
                <section className={this.getClassName()} style={style}>
                    <Link to="/home">
                        <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="rainbow-auth-firebase-signin_image" />
                    </Link>
                    <p className="rainbow-auth-firebase-signin_header">Sign in</p>
                    <Card className="rainbow-auth-firebase-signin_card">
                        <SocialLogin />
                        <article className="rainbow-auth-firebase-signin_inputs-container">
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
                                label="Login"
                                isLoading={isLoading}
                            />
                            <Link to="/home/forgot-password" className="rainbow-auth-firebase-signin_link">
                                Forgot your password?
                            </Link>
                        </article>
                    </Card>
                    <Link className="rainbow-auth-firebase-signin_link" to="/home/signup">Sign up?</Link>
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
    })(SignIn),
);
