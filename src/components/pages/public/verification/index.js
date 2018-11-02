import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Card from 'react-rainbow-components/components/Card';
import Button from 'react-rainbow-components/components/Button';
import Input from 'react-rainbow-components/components/Input';
import BackIcon from './../../../icons/back/index.js';
import UserIcon from './../../../icons/user/index.js';
import KeysIcon from './../../../icons/keys/index.js';
import {Cache} from 'aws-amplify';
import history from './../../../../history';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import verifyUser from './../../../../redux/actions/verify-user';
import './styles.css';
import './media-queries.css';

class Verification extends Component {
    componentWillMount() {
        const user = Cache.getItem('pendingVerificationUser');
        if (user) {
            const {username} = user;
            this.setState({
                username,
            });
        } else {
            history.replace('/home/signup');
        }
    }
    render() {
        return <VerificationUI
            initialValues={this.state}
            onSubmit={this.props.verifyUser}
        />;
    }
}

function stateToProps(state) {
    return {

    }
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        verifyUser,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(Verification);

const VerificationUI = reduxForm({ form: 'user-verification' })(
    (props) => {
        const {
            className,
            style,
            handleSubmit,
            onSubmit,
        } = props;

        function getClassName() {
            return classnames('aws-amplify-app-verify-account_container', className);
        }

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <section className={getClassName()} style={style}>
                    <Link className="aws-amplify-app-verify-account_back-link" to="/home/signup">
                        <BackIcon className="aws-amplify-app-verify-account_back-icon"/>
                        Back
                    </Link>
                    <Link to="/home">
                        <img src="/assets/rainbow-logo.svg" alt="rainbow logo"
                             className="aws-amplify-app-verify-account_image"/>
                    </Link>
                    <p className="aws-amplify-app-verify-account_header">Verify your account</p>
                    <Card className="aws-amplify-app-verify-account_card">
                        <article className="aws-amplify-app-verify-account_content">
                            <p className="aws-amplify-app-verify-account_message">
                                We have sent you an code to your Email
                            </p>
                            <Field
                                component={Input}
                                name="username"
                                label="Username"
                                required
                                disabled
                                icon={<UserIcon />}/>
                            <Field
                                component={Input}
                                name="code"
                                label="Enter the CODE we sent to"
                                placeholder="Enter the verification code"
                                type="number"
                                required
                                icon={<KeysIcon />}/>
                            <Button
                                variant="brand"
                                type="submit"
                                label="Confirm"
                            />
                            <p className="aws-amplify-app-verify-account_no-code">
                                No code?
                            </p>
                            <Button
                                variant="outline-brand"
                                label="Resend"
                                className="aws-amplify-app-verify-account_resend"/>
                        </article>
                    </Card>
                    <Link className="aws-amplify-app-verify-account_link" to="/home/signin">Sign in?</Link>
                </section>
            </form>
        );
    }
)


Verification.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
};

Verification.defaultProps = {
    className: undefined,
    style: {},
};
