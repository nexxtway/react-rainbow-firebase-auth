import {
    isFacebookUser,
    getFacebookUserId,
    isGitHubUser,
    getGitHubUserId,
} from '../../../services/firebase';
import authenticateUser from '../authenticate-user';

jest.mock('../../../services/firebase', () => ({
    isFacebookUser: jest.fn(),
    getFacebookUserId: jest.fn(),
    isGitHubUser: jest.fn(),
    getGitHubUserId: jest.fn(),
}));

const user = {
    displayName: 'User',
    email: 'user@mail.com',
    photoURL: null,
};

describe('authenticateUser', () => {
    it('should return an action with the user with photoUrl if the user is a facebook user', () => {
        isFacebookUser.mockReturnValue(true);
        isGitHubUser.mockReturnValue(false);
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
    it('should return an action with the user with photoUrl if the user is a github user', () => {
        isGitHubUser.mockReturnValue(true);
        isFacebookUser.mockReturnValue(false);
        getGitHubUserId.mockReturnValue(4781245901359037);
        const action = authenticateUser(user);
        expect(action).toEqual({
            type: 'USER_AUTHENTICATED',
            user: {
                ...user,
                photoURL: 'https://avatars0.githubusercontent.com/u/4781245901359037?v=4',
            },
        });
    });
    it('should return an action with the user without photoUrl if the user is not a social user', () => {
        isFacebookUser.mockReturnValue(false);
        isGitHubUser.mockReturnValue(false);
        const action = authenticateUser(user);
        expect(action).toEqual({
            type: 'USER_AUTHENTICATED',
            user,
        });
    });
});
