import React from 'react';
import { FormattedMessage } from 'react-intl';

const EMAIL_ERROR = (
    <FormattedMessage
        id="form.error.email.required"
        defaultMessage="Looks like you forget your email." />
);

const PASSWORD_ERROR = (
    <FormattedMessage
        id="form.error.password.required"
        defaultMessage="Looks like you forget your password." />
);

export default function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = EMAIL_ERROR;
    }
    if (!values.password) {
        errors.password = PASSWORD_ERROR;
    }
    return errors;
}
