import { signOutUser } from './../../services/firebase';

export const USER_LOGOUT_DONE = 'USER_LOGOUT_DONE';
export default function logoutUser() {
    return dispatch => signOutUser()
        .then(() => {
            dispatch({ type: USER_LOGOUT_DONE });
        });
}
