import React from 'react';
import { FormattedMessage } from 'react-intl';

const USERNAME_ERROR = (
    <FormattedMessage
        id="form.error.username.required"
        defaultMessage="Looks like you forget your username." />
);

const EMAIL_ERROR = (
    <FormattedMessage
        id="form.error.email.required"
        defaultMessage="Looks like you forget your email." />
);

const PHONE_ERROR = (
    <FormattedMessage
        id="form.error.phone.required"
        defaultMessage="Looks like you forget phone number." />
);

const PASSWORD_ERROR = (
    <FormattedMessage
        id="form.error.password.required"
        defaultMessage="Looks like you forget your password." />
);

export default function validate(values) {
    const errors = {};
    if (!values.username) {
        errors.username = USERNAME_ERROR;
    }
    if (!values.email) {
        errors.email = EMAIL_ERROR;
    }
    if (!values.phone) {
        errors.phone = PHONE_ERROR;
    }
    if (!values.password) {
        errors.password = PASSWORD_ERROR;
    }
    return errors;
}
