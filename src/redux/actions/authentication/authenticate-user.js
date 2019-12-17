import {
    isFacebookUser,
    getFacebookUserId,
    isGitHubUser,
    getGitHubUserId,
} from '../../services/firebase';

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export default function authenticateUser(user) {
    if (isFacebookUser(user)) {
        const facebookUserId = getFacebookUserId(user);
        return {
            type: USER_AUTHENTICATED,
            user: {
                ...user,
                photoURL: `https://graph.facebook.com/v2.12/${facebookUserId}/picture?type=large`,
            },
        };
    }
    if (isGitHubUser(user)) {
        const gitHubUserId = getGitHubUserId(user);
        return {
            type: USER_AUTHENTICATED,
            user: {
                ...user,
                photoURL: `https://avatars0.githubusercontent.com/u/${gitHubUserId}?v=4`,
            },
        };
    }
    return {
        type: USER_AUTHENTICATED,
        user,
    };
}
