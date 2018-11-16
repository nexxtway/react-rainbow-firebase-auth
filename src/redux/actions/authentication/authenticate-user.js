import { isFacebookUser, getFacebookUserId } from '../../services/firebase';

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
    return {
        type: USER_AUTHENTICATED,
        user,
    };
}
