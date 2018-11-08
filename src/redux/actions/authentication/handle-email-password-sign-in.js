import { signInWithEmailAndPassword } from '../../services/firebase';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

export default function handleSignInWithEmailAndPassword(user) {
    return (dispatch) => {
        const { email, password } = user;
        return signInWithEmailAndPassword(email, password)
            .then(() => dispatch({ type: AUTH_SUCCESS }))
            .catch((error) => {
                dispatch({
                    type: SHOW_ERROR_MESSAGE,
                    error,
                });
            });
    };
}
