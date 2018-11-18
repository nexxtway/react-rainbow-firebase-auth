import React from 'react';
import { FormattedMessage } from 'react-intl';
import { resolveError } from '../resolve-errors';

describe('resolveError', () => {
    it('should return the error received as is if is not a firebase error', () => {
        const error = resolveError('new error');
        expect(error).toBe('"new error"');
    });
    it('should return the error message if the error is a firebase error and the error code is not mapped', () => {
        const error = resolveError({
            code: 'new error code',
            message: 'error message',
        });
        expect(error).toBe('error message');
    });
    it('should return the corresponding FormattedMessage component if the error is a firebase error and the error code is mapped', () => {
        const error = resolveError({
            code: 'auth/user-not-found',
            message: 'error message',
        });
        expect(error).toEqual(<FormattedMessage id="user.not.found" defaultMessage="There is no user corresponding to the email address" />);
    });
});
