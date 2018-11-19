import getCurrentUser from '../get-current-user';
import reauthenticateUser from '../reauthenticate-user';

jest.mock('../get-current-user', () => jest.fn());

describe('reauthenticateUser', () => {
    it('should call reauthenticateAndRetrieveDataWithCredential with the user credentials', () => {
        getCurrentUser.mockReturnValue({
            reauthenticateAndRetrieveDataWithCredential: jest.fn(),
        });
        reauthenticateUser({
            email: 'user@domain.com',
            password: 'pswd',
        });
        expect(getCurrentUser().reauthenticateAndRetrieveDataWithCredential).toHaveBeenCalledWith({
            a: 'user@domain.com',
            b: 'pswd',
            providerId: 'password',
            signInMethod: 'password',

        });
    });
});
