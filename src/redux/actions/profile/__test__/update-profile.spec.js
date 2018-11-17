/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import updateUserProfile from '../../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../../services/firebase/change-current-user-password';
import updateProfile from '../update-profile';

jest.mock('react-intl', () => ({
    FormattedMessage: () => <span />,
}));
jest.mock('../../../services/firebase/update-profile', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../services/firebase/change-current-user-email', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../services/firebase/change-current-user-password', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../services/firebase/get-current-user', () => jest.fn(() => ({
    displayName: 'User',
    email: 'user@mail.com',
})));
jest.mock('../../../services/firebase/resolve-errors', () => ({
    resolveError: jest.fn(error => error),
}));

describe('updateProfile', () => {
    it('should not call any service or dispatch any action if the currentUser data and profile are equal', () => {
        const dispatch = jest.fn();
        updateProfile({
            displayName: 'User',
            email: 'user@mail.com',
        })(dispatch);

        expect(updateUserProfile).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
    });
    it('should only call updateUserProfile if the only different field is displayName', () => {
        expect.assertions(7);
        const dispatch = jest.fn();
        updateProfile({
            displayName: 'User Test',
            email: 'user@mail.com',
        })(dispatch).then(() => {
            expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
            expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
            expect(updateUserProfile).toHaveBeenCalledWith({ displayName: 'User Test' });
            expect(dispatch.mock.calls[0][0]).toEqual({
                type: 'UPDATE_PROFILE_START',
            });
            expect(dispatch.mock.calls[1][0]).toEqual({
                type: 'UPDATE_USER_DATA',
                data: {
                    displayName: 'User Test',
                    email: 'user@mail.com',
                },
            });
            expect(dispatch.mock.calls[2][0]).toEqual({
                type: 'UPDATE_PROFILE_END',
            });
            expect(dispatch.mock.calls[3][0]).toEqual({
                type: 'SHOW_SUCCESS_MESSAGE',
                message: (
                    <FormattedMessage
                        id="profile.success.message"
                        defaultMesssage="Your profile information has been changed successfully." />
                ),
            });
        });
    });
    it('should only call changeCurrentUserEmail if the only different field is email', () => {
        expect.assertions(5);
        const dispatch = jest.fn();
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();

        updateProfile({
            displayName: 'User',
            email: 'newmail@gmail.com',
        })(dispatch).then(() => {
            expect(updateUserProfile).toHaveBeenCalledTimes(0);
            expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
            expect(changeCurrentUserEmail).toHaveBeenCalledWith('newmail@gmail.com');
            expect(dispatch).toHaveBeenCalledTimes(4);
            expect(dispatch.mock.calls[1][0]).toEqual({
                type: 'UPDATE_USER_DATA',
                data: {
                    displayName: 'User',
                    email: 'newmail@gmail.com',
                },
            });
        });
    });
    it('should only call changeCurrentUserPassword if the only different field is password', () => {
        expect.assertions(4);
        const dispatch = jest.fn();
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();

        updateProfile({
            displayName: 'User',
            email: 'user@mail.com',
            password: 'newPassword',
        })(dispatch).then(() => {
            expect(updateUserProfile).toHaveBeenCalledTimes(0);
            expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
            expect(changeCurrentUserPassword).toHaveBeenCalledWith('newPassword');
            expect(dispatch).toHaveBeenCalledTimes(3);
        });
    });
    it('should call all services needed when all fields are different', () => {
        expect.assertions(5);
        const dispatch = jest.fn();
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();

        updateProfile({
            displayName: 'User Test',
            email: 'newemail@gmail.com',
            password: 'newPassword',
        })(dispatch).then(() => {
            expect(updateUserProfile).toHaveBeenCalledWith({ displayName: 'User Test' });
            expect(changeCurrentUserEmail).toHaveBeenCalledWith('newemail@gmail.com');
            expect(changeCurrentUserPassword).toHaveBeenCalledWith('newPassword');
            expect(dispatch).toHaveBeenCalledTimes(4);
            expect(dispatch.mock.calls[1][0]).toEqual({
                type: 'UPDATE_USER_DATA',
                data: {
                    displayName: 'User Test',
                    email: 'newemail@gmail.com',
                },
            });
        });
    });
    it('should call showErrorMessage and not update the user profile if any of the services fails', () => {
        expect.assertions(5);
        const dispatch = jest.fn();
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();
        updateUserProfile.mockReturnValue(Promise.reject('error'));

        updateProfile({
            displayName: 'User Test',
            email: 'user@mail.com',
        })(dispatch).then(() => {
            expect(updateUserProfile).toHaveBeenCalledWith({ displayName: 'User Test' });
            expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
            expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
            expect(dispatch).toHaveBeenCalledTimes(3);
            expect(dispatch.mock.calls[2][0]).toEqual({
                type: 'SHOW_ERROR_MESSAGE',
                message: 'error',
            });
        });
    });
});
