import getUserPhotoURL from './get-user-photo-url';

export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';

export default function authenticateUser(user) {
    return {
        type: USER_AUTHENTICATED,
        user: {
            ...user,
            photoURL: getUserPhotoURL(user),
        },
    };
}
