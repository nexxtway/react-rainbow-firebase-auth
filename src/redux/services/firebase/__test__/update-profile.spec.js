import getCurrentUser from '../get-current-user';
import updateProfile from '../update-profile';

jest.mock('../get-current-user', () => jest.fn());

describe('updateProfile', () => {
    it('should call updateProfile with the new user profile data', () => {
        getCurrentUser.mockReturnValue({
            updateProfile: jest.fn(),
        });
        updateProfile({ displayName: 'new@mail.com', email: 'user@email.com' });
        expect(getCurrentUser().updateProfile).toHaveBeenCalledWith({
            displayName: 'new@mail.com',
            email: 'user@email.com',
        });
    });
});
