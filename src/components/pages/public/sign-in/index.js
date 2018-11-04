import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import { loginWithEmailAndPassword, resetAuthForm } from '../../../../redux/actions/authentication';
import LockIcon from '../../../icons/lock/index.js';
import UserIcon from '../../../icons/user/index.js';
import SocialLogin from '../../../experiences/social-login';
import './styles.css';
import './media-queries.css';

function SignIn(props) {
    const {
        className,
        style,
        handleSubmit,
        loginWithEmailAndPassword,
        isLoading,
    } = props;

    function getClassName() {
        return classnames('aws-amplify-app-signin_container', className);
    }

    return (
        <form noValidate onSubmit={handleSubmit(loginWithEmailAndPassword)}>
            <section className={getClassName()} style={style}>
                <Link to="/home">
                    <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="aws-amplify-app-signin_image" />
                </Link>
                <p className="aws-amplify-app-signin_header">Sign in</p>
                <Card className="aws-amplify-app-signin_card">
                    <SocialLogin />
                    <article className="aws-amplify-app-signin_inputs-container">
                        <Field
                            component={Input}
                            name="username"
                            label="Username"
                            required
                            placeholder="Enter your username"
                            icon={<UserIcon />} />
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
                        <Link to="/home/forgot-password" className="aws-amplify-app-signin_link">
                            Forgot your password?
                        </Link>
                    </article>
                </Card>
                <Link className="aws-amplify-app-signin_link" to="/home/signup">Sign up?</Link>
            </section>
        </form>
    );
}

SignIn.propTypes = {
    loginWithEmailAndPassword: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
};

SignIn.defaultProps = {
    handleSubmit: () => {},
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
