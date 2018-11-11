import { signInWithGoogle } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';

export const AUTH_START_WITH_GOOGLE = 'AUTH_START_WITH_GOOGLE';
export const AUTH_SUCCESS_WITH_GOOGLE = 'AUTH_SUCCESS_WITH_GOOGLE';

export default function loginWithGoogle() {
    return (dispatch) => {
        dispatch({ type: AUTH_START_WITH_GOOGLE });
        return signInWithGoogle()
            .then(() => {
                dispatch({ type: AUTH_SUCCESS_WITH_GOOGLE });
            })
            .catch(error => dispatch(showErrorMessage(error)));
    };
}
