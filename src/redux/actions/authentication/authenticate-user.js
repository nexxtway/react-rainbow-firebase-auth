import { isFacebookUser, getFacebookUserId } from '../../services/firebase';

export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export default function authenticateUser(user) {
    if (isFacebookUser(user)) {
        const facebookUserId = getFacebookUserId(user);
        return {
            type: AUTHENTICATE_USER,
            user: {
                ...user,
                photoURL: `https://graph.facebook.com/v2.12/${facebookUserId}/picture?type=normal`,
            },
        };
    }
    return {
        type: AUTHENTICATE_USER,
        user,
    };
}
