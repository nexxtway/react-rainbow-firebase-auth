import { signInWithEmailAndPassword } from '../../services/firebase';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export default function handleSignInWithEmailAndPassword(user) {
    return (dispatch) => {
        const { email, password } = user;
        return signInWithEmailAndPassword(email, password)
            .then(() => dispatch({ type: AUTH_SUCCESS }))
            .catch((error) => {
                dispatch({
                    type: AUTH_ERROR,
                    error,
                });
            });
    };
}
