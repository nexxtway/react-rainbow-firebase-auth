import reauthenticateUserService from '../../../services/firebase/reauthenticate-user';
import reauthenticateUser from '../reauthenticate-user';

jest.mock('../../../services/firebase/reauthenticate-user', () => jest.fn());

describe('reauthenticateUser', () => {
    it('should call reauthenticateUser service with the right data', () => {
        reauthenticateUser({
            email: 'user@domain.com',
            password: 'pswd',
        });
        expect(reauthenticateUserService).toHaveBeenCalledWith({
            email: 'user@domain.com',
            password: 'pswd',
        });
    });
});
