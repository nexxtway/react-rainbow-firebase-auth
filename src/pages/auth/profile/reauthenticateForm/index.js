import React from 'react';
import PropTypes from 'prop-types';
import {
    defineMessages,
    FormattedMessage,
    injectIntl,
} from 'react-intl';
import { Field, reduxForm } from 'redux-form';
import Input from 'react-rainbow-components/components/Input';
import Button from 'react-rainbow-components/components/Button';
import LockIcon from '../../../../components/icons/lock';
import validate from './validate';
import EmailIcon from '../../../../components/icons/email';
import StyledForm from './styled/form';
import StyledButtonContainer from './styled/buttonContainer';

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

function ReauthenticateForm(props) {
    const { intl, handleSubmit, onSubmit } = props;
    return (
        <StyledForm noValidate onSubmit={handleSubmit(onSubmit)}>
            <Field
                component={Input}
                name="email"
                label={<FormattedMessage id="form.email.label" defaultMessage="Email address" />}
                required
                placeholder={intl.formatMessage(translations.emailPlaceholder)}
                type="email"
                icon={<EmailIcon />} />
            <Field
                component={Input}
                name="password"
                label={<FormattedMessage id="form.password.label" defaultMessage="Password" />}
                placeholder={intl.formatMessage(translations.passwordPlaceholder)}
                type="password"
                required
                icon={<LockIcon />} />
            <StyledButtonContainer>
                <Button
                    type="submit"
                    variant="brand"
                    label={(
                        <FormattedMessage
                            id="profile.reauthenticate.action"
                            defaultMessage="Authenticate" />
                    )} />
            </StyledButtonContainer>
        </StyledForm>
    );
}

ReauthenticateForm.propTypes = {
    intl: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
    form: 'reauthenticate',
    touchOnBlur: false,
    validate,
})(injectIntl(ReauthenticateForm));
