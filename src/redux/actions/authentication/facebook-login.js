import getCurrentLocale from '../../services/app/get-current-locale';
import { signInWithFacebook } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';

export const AUTH_START_WITH_FACEBOOK = 'AUTH_START_WITH_FACEBOOK';
export const AUTH_SUCCESS_WITH_FACEBOOK = 'AUTH_SUCCESS_WITH_FACEBOOK';

export default function loginWithFacebook() {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_START_WITH_FACEBOOK });
        const locale = getCurrentLocale(getState());
        return signInWithFacebook(locale, ['public_profile', 'email'])
            .then(() => {
                dispatch({ type: AUTH_SUCCESS_WITH_FACEBOOK });
            })
            .catch(error => dispatch(showErrorMessage(error)));
    };
}
