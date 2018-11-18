import { isFacebookUser, getFacebookUserId } from '../../../services/firebase';
import authenticateUser from '../authenticate-user';

jest.mock('../../../services/firebase', () => ({
    isFacebookUser: jest.fn(),
    getFacebookUserId: jest.fn(),
}));

const user = {
    displayName: 'User',
    email: 'user@mail.com',
};

describe('authenticateUser', () => {
    it('should return an action with the user with photoUrl if the user is a facebook user', () => {
        isFacebookUser.mockReturnValue(true);
        getFacebookUserId.mockReturnValue(2984756728936410);
        const action = authenticateUser(user);
        expect(action).toEqual({
            type: 'USER_AUTHENTICATED',
            user: {
                ...user,
                photoURL: 'https://graph.facebook.com/v2.12/2984756728936410/picture?type=large',
            },
        });
    });
    it('should return an action with the user without photoUrl if the user is not a facebook user', () => {
        isFacebookUser.mockReturnValue(false);
        const action = authenticateUser(user);
        expect(action).toEqual({
            type: 'USER_AUTHENTICATED',
            user,
        });
    });
});
