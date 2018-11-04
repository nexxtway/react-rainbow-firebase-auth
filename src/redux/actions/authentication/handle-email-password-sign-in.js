import { signInWithEmailAndPassword } from '../services/firebase';
import authenticateUser from './authenticate-user';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';

export default function handleSignInWithEmailAndPassword(user) {
    return (dispatch) => {
        const { email, password } = user;
        return signInWithEmailAndPassword(email, password)
            .then((firebaseUser) => {
                dispatch({ type: AUTH_SUCCESS });
                dispatch(authenticateUser(firebaseUser));
            })
            .catch((error) => {
                dispatch({
                    type: AUTH_ERROR,
                    error,
                });
            });
    };
}
