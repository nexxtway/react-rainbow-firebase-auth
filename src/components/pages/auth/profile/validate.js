import React from 'react';
import { FormattedMessage } from 'react-intl';

const DISPLAY_NAME_ERROR = (
    <FormattedMessage
        id="form.error.displayName.required"
        defaultMessage="Looks like you forget your name." />
);

const EMAIL_ERROR = (
    <FormattedMessage
        id="form.error.email.required"
        defaultMessage="Looks like you forget your email." />
);

export default function validate(values) {
    const errors = {};
    if (!values.displayName) {
        errors.displayName = DISPLAY_NAME_ERROR;
    }
    if (!values.email) {
        errors.email = EMAIL_ERROR;
    }
    return errors;
}
