import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import UserIcon from './../../../icons/user/index.js';
import BackIcon from './../../../icons/back/index.js';
import './styles.css';
import './media-queries.css';
import sendForgotPasswordCode from './../../../../redux/actions/send-forgot-password-code';

function ForgotPassword(props) {
    const {
        className,
        style,
        handleSubmit,
        sendForgotPasswordCode,
    } = props;

    function getClassName() {
        return classnames('aws-amplify-app-forgot-password_container', className);
    }

    return (
        <form onSubmit={handleSubmit(sendForgotPasswordCode)} noValidate>
            <section className={getClassName()} style={style}>
                <Link className="aws-amplify-app-forgot-password_back-link" to="/home/signin">
                    <BackIcon className="aws-amplify-app-forgot-password_back-icon"/>
                    Back
                </Link>
                <Link to="/home">
                    <img src="/assets/rainbow-logo.svg" alt="rainbow logo" className="aws-amplify-app-forgot-password_image" />
                </Link>
                <p className="aws-amplify-app-forgot-password_header">Reset Password</p>
                <Card className="aws-amplify-app-forgot-password_card">
                    <article className="aws-amplify-app-forgot-password_content">
                        <p className="aws-amplify-app-forgot-password_message">
                            A security code will be sent to your email address.
                        </p>
                        <Field
                            component={Input}
                            name="username"
                            label="Username"
                            required
                            placeholder="Enter your username"
                            icon={<UserIcon />} />
                        <Button
                            variant="brand"
                            type="submit"
                            label="Send code"
                        />
                    </article>
                </Card>
            </section>
        </form>
    )
}

ForgotPassword.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

ForgotPassword.defaultProps = {
    className: undefined,
    style: {},
};

function stateToProps(state) {
    return {

    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        sendForgotPasswordCode,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'forgot-password',
    })(ForgotPassword),
);
