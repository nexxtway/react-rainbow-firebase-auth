import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function validate(values) {
    const errors = {};
    if (!values.email) {
        errors.email = (
            <FormattedMessage
                id="form.error.email.required"
                defaultMessage="Looks like you forget your email." />
        );
    }
    return errors;
}
