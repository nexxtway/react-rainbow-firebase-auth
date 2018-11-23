/* eslint-disable prefer-promise-reject-errors */
import handleReauthentication from '../handle-reauthentication';
import reauthenticateUser from '../reauthenticate-user';
import updateProfile from '../update-profile';
import showErrorMessage from '../../app/show-error-message';

jest.mock('../update-profile', () => jest.fn(() => jest.fn()));
jest.mock('../reauthenticate-user', () => jest.fn(() => Promise.resolve()));
jest.mock('../../app/show-error-message', () => jest.fn());

const credentials = {
    email: 'email',
    password: 'pswd',
};

describe('handleReauthentication', () => {
    it('should update user profile if reauthentication succeeded', () => {
        expect.assertions(3);
        const dispatch = jest.fn();
        handleReauthentication(credentials, credentials)(dispatch).then(() => {
            expect(reauthenticateUser).toHaveBeenCalledWith({
                email: 'email',
                password: 'pswd',
            });
            expect(dispatch.mock.calls[0][0]).toEqual({ type: 'HIDE_REAUTHENTICATE_MODAL' });
            expect(updateProfile).toHaveBeenCalledWith({
                email: 'email',
                password: 'pswd',
            });
        });
    });
    it('should dispatch showErrorMessage if reauthentication fails', () => {
        expect.assertions(1);
        reauthenticateUser.mockReturnValue(Promise.reject('error'));
        const dispatch = jest.fn();
        handleReauthentication(credentials, credentials)(dispatch).then(() => {
            expect(showErrorMessage).toHaveBeenCalledWith('error');
        });
    });
});
