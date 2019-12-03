import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import {
    FormattedMessage,
    injectIntl,
    defineMessages,
} from 'react-intl';
import {
    Card,
    Button,
    Input,
} from 'react-rainbow-components/';
import { resetForm, sendEmailResetPassword } from '../../../redux/actions/forgotPassword';
import EmailIcon from '../../../components/icons/email';
import validate from './validate';
import {
    LanguageSelector,
    BackButton,
    LogoLink,
} from '../../../components';
import './styles.css';
import './media-queries.css';

const translations = defineMessages({
    emailPlaceholder: {
        id: 'form.email.placeholder',
        defaultValue: 'Enter your email address',
    },
});

class ForgotPassword extends Component {
    componentDidMount() {
        const { resetForm } = this.props;
        resetForm();
    }

    getClassName() {
        const { className } = this.props;
        return classnames('rainbow-auth-firebase-forgot-password_container', className);
    }

    render() {
        const {
            handleSubmit,
            sendEmailResetPassword,
            isLoading,
            style,
            intl,
        } = this.props;
        return (
            <form onSubmit={handleSubmit((email) => sendEmailResetPassword(email))} noValidate>
                <section className={this.getClassName()} style={style}>
                    <BackButton className="rainbow-auth-firebase-forgot-password_back-button" />
                    <LogoLink />
                    <p className="rainbow-auth-firebase-forgot-password_header">
                        <FormattedMessage id="forgotpassword.title" defaultMessage="Reset password" />
                    </p>
                    <Card className="rainbow-auth-firebase-forgot-password_card">
                        <article className="rainbow-auth-firebase-forgot-password_content">
                            <p className="rainbow-auth-firebase-forgot-password_message">
                                <FormattedMessage
                                    id="forgotpassword.header.text"
                                    defaultMessage="A security code will be sent to your email address." />
                            </p>
                            <Field
                                component={Input}
                                name="email"
                                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                                required
                                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                                icon={<EmailIcon />} />
                            <Button
                                variant="brand"
                                type="submit"
                                label={<FormattedMessage id="forgotpassword.button" defaultMessage="Send email" />}
                                isLoading={isLoading}
                            />
                        </article>
                    </Card>
                    <LanguageSelector />
                </section>
            </form>
        );
    }
}

ForgotPassword.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    sendEmailResetPassword: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object,
    intl: PropTypes.object.isRequired,
};

ForgotPassword.defaultProps = {
    handleSubmit: () => {},
    className: undefined,
    style: {},
};

function stateToProps(state) {
    const { forgot } = state;
    return forgot.toJS();
}

function dispatchToProps(dispatch) {
    return bindActionCreators({
        sendEmailResetPassword,
        resetForm,
    }, dispatch);
}

export default connect(stateToProps, dispatchToProps)(
    reduxForm({
        form: 'forgot-password',
        touchOnBlur: false,
        validate,
    })(injectIntl(ForgotPassword)),
);
