import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import BackIcon from './../../../icons/back/index.js';
import LockIcon from './../../../icons/lock/index.js';
import KeysIcon from './../../../icons/keys/index.js';
import './styles.css';
import './media-queries.css';
import getResetPasswordDetails from './../../../../redux/actions/get-reset-password-details';
import resetPassword from './../../../../redux/actions/reset-password';;

class ResetPassword extends Component {
    componentWillMount() {
        this.props.getResetPasswordDetails();
    }

    getClassName() {
        const { className } = this.props;
        return classnames('aws-amplify-app-reset-password_container', className);
    }

    render() {
        const {
            style,
            details,
            handleSubmit,
            resetPassword,
        } = this.props;
        if (details) {
            return (
                <form noValidate onSubmit={handleSubmit(resetPassword)}>
                    <section className={this.getClassName()} style={style}>
                        <Link className="aws-amplify-app-reset-password_back-link" to="/home/signup">
                            <BackIcon className="aws-amplify-app-reset-password_back-icon"/>
                            Back
                        </Link>
                        <Link to="/home">
                            <img src="/assets/rainbow-logo.svg" alt="rainbow logo"
                                 className="aws-amplify-app-reset-password_image"/>
                        </Link>
                        <p className="aws-amplify-app-reset-password_header">Reset Password</p>
                        <Card className="aws-amplify-app-reset-password_card">
                            <article className="aws-amplify-app-reset-password_content">
                                <p className="aws-amplify-app-reset-password_message">
                                    We have sent you an code to your Email
                                    <strong> {details.Destination}</strong>
                                </p>
                                <Field
                                    component={Input}
                                    name="code"
                                    label="Enter the CODE we sent to"
                                    required
                                    placeholder="Enter the verification code"
                                    icon={<KeysIcon/>}/>
                                <Field
                                    component={Input}
                                    name="newPassword"
                                    label="Password"
                                    type="password"
                                    required
                                    placeholder="Enter the new password"
                                    icon={<LockIcon/>}/>
                                <Button
                                    variant="brand"
                                    type="submit"
                                    label="Reset"
                                />
                            </article>
                        </Card>
                        <Link className="aws-amplify-app-reset-password_link" to="/home/signin">Sign in?</Link>
                    </section>
                </form>
            );
        }
        return null;
    }
}

function stateToProps(state) {
    return {
        details: state.app.resetPasswordDetails,
    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        getResetPasswordDetails,
        resetPassword,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'reset-password',
    })(ResetPassword),
);
