import updateUserProfile from '../../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../../services/firebase/change-current-user-password';
import resolvePromises from '../resolve-promises';

jest.mock('../../../services/firebase/update-profile', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../services/firebase/change-current-user-email', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../services/firebase/change-current-user-password', () => jest.fn(() => Promise.resolve()));
jest.mock('../../../services/firebase/get-current-user', () => jest.fn(() => ({
    displayName: 'User',
    email: 'user@mail.com',
})));

describe('resolvePromises', () => {
    it('should not call any service if the currentUser data and profile are equal', () => {
        resolvePromises({
            displayName: 'User',
            email: 'user@mail.com',
        });

        expect(updateUserProfile).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
    });
    it('should only call updateUserProfile if the only different field is displayName', () => {
        resolvePromises({
            displayName: 'User Test',
            email: 'user@mail.com',
        });
        expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
        expect(updateUserProfile).toHaveBeenCalledWith({ displayName: 'User Test' });
    });
    it('should only call changeCurrentUserEmail if the only different field is email', () => {
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();

        resolvePromises({
            displayName: 'User',
            email: 'newmail@gmail.com',
        });

        expect(updateUserProfile).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserPassword).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserEmail).toHaveBeenCalledWith('newmail@gmail.com');
    });
    it('should only call changeCurrentUserPassword if the only different field is password', () => {
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();

        resolvePromises({
            displayName: 'User',
            email: 'user@mail.com',
            password: 'newPassword',
        });

        expect(updateUserProfile).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserEmail).toHaveBeenCalledTimes(0);
        expect(changeCurrentUserPassword).toHaveBeenCalledWith('newPassword');
    });
    it('should call all services needed when all fields are different', () => {
        updateUserProfile.mockReset();
        changeCurrentUserEmail.mockReset();
        changeCurrentUserPassword.mockReset();

        resolvePromises({
            displayName: 'User Test',
            email: 'newemail@gmail.com',
            password: 'newPassword',
        });

        expect(updateUserProfile).toHaveBeenCalledWith({ displayName: 'User Test' });
        expect(changeCurrentUserEmail).toHaveBeenCalledWith('newemail@gmail.com');
        expect(changeCurrentUserPassword).toHaveBeenCalledWith('newPassword');
    });
});
