/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import updateProfile from '../update-profile';
import resolvePromises from '../resolve-promises';
import handleUpdateProfileError from '../handle-update-profile-error';

jest.mock('react-intl', () => ({
    FormattedMessage: () => <span />,
}));
jest.mock('../../../services/firebase/get-current-user', () => jest.fn(() => ({
    displayName: 'User',
    email: 'user@mail.com',
})));
jest.mock('../resolve-promises', () => jest.fn(() => [Promise.resolve()]));
jest.mock('../handle-update-profile-error', () => jest.fn());
jest.mock('../../../services/firebase/resolve-errors', () => ({
    resolveError: jest.fn(error => error),
}));

describe('updateProfile', () => {
    it('should call updateUserData and showSuccessMessage if nither of the services fails', () => {
        expect.assertions(2);
        const dispatch = jest.fn();

        updateProfile({
            displayName: 'User Test',
            email: 'user@mail.com',
        })(dispatch).then(() => {
            expect(dispatch).toHaveBeenCalledTimes(5);
            expect(dispatch.mock.calls[0][0]).toEqual({
                displayName: 'User Test',
                email: 'user@mail.com',
            });
        });
    });
    it('should call handleUpdateProfileError and not update the user profile if any of the services fails', () => {
        expect.assertions(2);
        const dispatch = jest.fn();
        resolvePromises.mockReturnValue([Promise.reject('error')]);

        updateProfile({
            displayName: 'User Test',
            email: 'user@mail.com',
        })(dispatch).then(() => {
            expect(handleUpdateProfileError).toHaveBeenCalledWith('error');
            expect(dispatch).toHaveBeenCalledTimes(3);
        });
    });
});
