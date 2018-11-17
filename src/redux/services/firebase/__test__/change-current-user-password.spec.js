import getCurrentUser from '../get-current-user';
import changeCurrentUserPassword from '../change-current-user-password';

jest.mock('../get-current-user', () => jest.fn());

describe('changeCurrentUserPassword', () => {
    it('should call updatePassword with the new user password', () => {
        getCurrentUser.mockReturnValue({
            updatePassword: jest.fn(),
        });
        changeCurrentUserPassword('newPassword');
        expect(getCurrentUser().updatePassword).toHaveBeenCalledWith('newPassword');
    });
});
