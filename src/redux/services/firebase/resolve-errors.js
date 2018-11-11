import React from 'react';
import { FormattedMessage } from 'react-intl';

const USER_NOT_FOUND = <FormattedMessage id="user.not.found" defaultMessage="There is no user corresponding to the email address" />;
const NETWORK_REQUEST_FAILED = <FormattedMessage id="network.request.failed" defaultMessage="A network error (such as timeout, interrupted connection or unreachable host) has occurred" />;
const COUNTRY_BLOCKED_CUBA = <FormattedMessage id="country.blocked.cuba" defaultMessage="This service is not available from Cuba. If you believe the country of origin was incorrectly identified, please report it at https://support.google.com/websearch/contact/ip" />;
const WRONG_PASSWORD = <FormattedMessage id="wrong.password" defaultMessage="The password is invalid" />;
const INVALID_EMAIL = <FormattedMessage id="invalid.email" defaultMessage="The email address is badly formatted" />;
const WEAK_PASSWORD = <FormattedMessage id="weak.password" defaultMessage="Password should be at least 6 characters" />;

const errorMap = {
    'auth/user-not-found': USER_NOT_FOUND,
    'auth/network-request-failed': NETWORK_REQUEST_FAILED,
    'auth/internal-error': COUNTRY_BLOCKED_CUBA,
    'auth/wrong-password': WRONG_PASSWORD,
    'auth/invalid-email': INVALID_EMAIL,
    'auth/weak-password': WEAK_PASSWORD,
};

export function isFirebaseError(error) {
    return typeof error === 'object' && error !== null
        && typeof error.code === 'string'
        && typeof error.message === 'string';
}

export function resolveError(error) {
    if (isFirebaseError(error)) {
        if (errorMap[error.code]) {
            return errorMap[error.code];
        }
        return error.message;
    }
    return error.message || JSON.stringify(error);
}
