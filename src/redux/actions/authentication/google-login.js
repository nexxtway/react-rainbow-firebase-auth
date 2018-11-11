import getCurrentLocale from '../../services/app/get-current-locale';
import { signInWithGoogle } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';

export const AUTH_START_WITH_GOOGLE = 'AUTH_START_WITH_GOOGLE';
export const AUTH_SUCCESS_WITH_GOOGLE = 'AUTH_SUCCESS_WITH_GOOGLE';

export default function loginWithFacebook() {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_START_WITH_GOOGLE });
        const locale = getCurrentLocale(getState());
        return signInWithGoogle(locale, ['public_profile', 'email'])
            .then(() => {
                dispatch({ type: AUTH_SUCCESS_WITH_GOOGLE });
            })
            .catch(error => dispatch(showErrorMessage(error)));
    };
}
