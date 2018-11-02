import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Field, reduxForm} from 'redux-form'
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import SocialLogin from './../../../experiences/social-login';
import EmailIcon from './../../../icons/email/index.js';
import LockIcon from './../../../icons/lock/index.js';
import UserIcon from './../../../icons/user/index.js';
import signup from './../../../../redux/actions/signup';
import './styles.css';
import './media-queries.css';
import validate from './validate';

function SignUp(props) {
    const {
        className,
        style,
    } = props;

    function getClassName() {
        return classnames('aws-amplify-app-signup_container', className);
    }

    function signup(values) {
        props.signup(values);
    }

    return (
        <form novalidate onSubmit={props.handleSubmit(signup)}>
            <section className={getClassName()} style={style}>
                <Link to="/home">
                    <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="aws-amplify-app-signup_image"/>
                </Link>
                <p className="aws-amplify-app-signup_header">Sign up</p>
                <Card className="aws-amplify-app-signup_card">
                    <SocialLogin/>
                    <article className="aws-amplify-app-signup_inputs-container">

                        <Field
                            component={Input}
                            name="username"
                            label="Username"
                            required
                            placeholder="Enter your username"
                            icon={<UserIcon />}/>
                        <Field
                            component={Input}
                            name="email"
                            label="Email Address"
                            required
                            placeholder="Enter your email address"
                            icon={<EmailIcon />}/>
                        <Field
                            component={Input}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            required
                            icon={<LockIcon />}/>
                        <Button
                            variant="brand"
                            type="submit"
                            label="Create Account"
                            onClick={props.handleSubmit(signup)}
                        />
                        <p className="aws-amplify-app-signup_terms-conditions">
                            By creating an account you agree to our Terms and Conditions and our Privacy Policy.
                        </p>
                    </article>
                </Card>
                <Link className="aws-amplify-app-signup_link" to="/home/signin">Sign in?</Link>
            </section>
        </form>
    );
}

SignUp.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

SignUp.defaultProps = {
    className: undefined,
    style: {},
};

function stateToProps(state) {
    return {}
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        signup,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'signup',
        validate,
    })(SignUp),
);

