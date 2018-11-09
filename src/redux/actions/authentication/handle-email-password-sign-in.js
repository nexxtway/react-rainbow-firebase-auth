import { signInWithEmailAndPassword } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';

export default function handleSignInWithEmailAndPassword(user) {
    return (dispatch) => {
        const { email, password } = user;
        return signInWithEmailAndPassword(email, password)
            .then(() => dispatch({ type: AUTH_SUCCESS }))
            .catch(error => dispatch(showErrorMessage(error)));
    };
}
