import firebase from 'firebase';
import getCurrentUser from '../get-current-user';
import reauthenticateUser from '../reauthenticate-user';

jest.mock('../get-current-user', () => jest.fn());
jest.mock('firebase', () => ({
    auth: {
        EmailAuthProvider: {
            credential: jest.fn(() => ({ user: 'user', pswd: 'pswd' })),
        },
    },
}));

describe('reauthenticateUser', () => {
    it('should call reauthenticateAndRetrieveDataWithCredential with the user credentials', () => {
        getCurrentUser.mockReturnValue({
            reauthenticateAndRetrieveDataWithCredential: jest.fn(),
        });
        reauthenticateUser({
            email: 'user@domain.com',
            password: 'pswd',
        });
        expect(firebase.auth.EmailAuthProvider.credential).toHaveBeenCalledWith('user@domain.com', 'pswd');
        expect(getCurrentUser().reauthenticateAndRetrieveDataWithCredential).toHaveBeenCalledWith({
            user: 'user',
            pswd: 'pswd',
        });
    });
});
