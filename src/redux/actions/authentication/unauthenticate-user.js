import { signOutUser } from '../../services/firebase';

export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';
export default function logoutUser() {
    return dispatch => signOutUser()
        .then(() => {
            dispatch({ type: UNAUTHENTICATE_USER });
        });
}
