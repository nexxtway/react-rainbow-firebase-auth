import getCurrentUser from '../get-current-user';
import changeCurrentUserEmail from '../change-current-user-email';

jest.mock('../get-current-user', () => jest.fn());

describe('changeCurrentUserEmail', () => {
    it('should call updateEmail with the new user email', () => {
        getCurrentUser.mockReturnValue({
            updateEmail: jest.fn(),
        });
        changeCurrentUserEmail('new@mail.com');
        expect(getCurrentUser().updateEmail).toHaveBeenCalledWith('new@mail.com');
    });
});
