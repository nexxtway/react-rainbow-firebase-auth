/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import updateProfile, { UPDATE_PROFILE_END } from '../update-profile';
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
jest.mock('../handle-update-profile-error', () => jest.fn(() => jest.fn()));
jest.mock('redux-form', () => ({
    change: jest.fn((...params) => ({ type: 'CHANGE', params })),
}));

describe('updateProfile', () => {
    it('should call updateUserData and showSuccessMessage if neither of the services fails', () => {
        expect.assertions(5);
        const dispatch = jest.fn();

        updateProfile({
            displayName: 'User Test',
            email: 'user@mail.com',
        })(dispatch).then(() => {
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'UPDATE_PROFILE_START' });
            expect(dispatch.mock.calls[1][0]).toEqual({
                data: {
                    displayName: 'User Test',
                    email: 'user@mail.com',
                },
                type: 'UPDATE_USER_DATA',
            });
            expect(dispatch.mock.calls[2][0]).toEqual({ type: 'CHANGE', params: ['profile', 'password', ''] });
            expect(dispatch.mock.calls[3][0]).toEqual({ type: 'UPDATE_PROFILE_END' });
            expect(dispatch.mock.calls[4][0]).toEqual({
                type: 'SHOW_SUCCESS_MESSAGE',
                message: (
                    <FormattedMessage
                        id="profile.success.message"
                        defaultMesssage="Your profile information has been changed successfully." />
                ),
            });
        });
    });
    it('should call handleUpdateProfileError and not update the user profile if any of the services fails', () => {
        expect.assertions(4);
        const dispatch = jest.fn();
        resolvePromises.mockReturnValue([Promise.reject('error')]);

        updateProfile({
            displayName: 'User Test',
            email: 'user@mail.com',
        })(dispatch).then(() => {
            expect(dispatch).toHaveBeenCalledTimes(3);
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'UPDATE_PROFILE_START' });
            expect(handleUpdateProfileError).toHaveBeenCalledWith('error');
            expect(dispatch.mock.calls[2][0]).toEqual({ type: UPDATE_PROFILE_END });
        });
    });
});
