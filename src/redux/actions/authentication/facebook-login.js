import getCurrentLocale from '../services/app/get-current-locale';
import { signInWithFacebook } from '../services/firebase';
import GA from '../../ga';

export const AUTH_START_WITH_FACEBOOK = 'AUTH_START_WITH_FACEBOOK';
export const AUTH_SUCCESS_WITH_FACEBOOK = 'AUTH_SUCCESS_WITH_FACEBOOK';
export const AUTH_ERROR_WITH_FACEBOOK = 'AUTH_ERROR_WITH_FACEBOOK';

export default function loginWithFacebook() {
    GA.event({
        category: 'User',
        action: 'Login with Facebook',
    });
    return (dispatch, getState) => {
        dispatch({ type: AUTH_START_WITH_FACEBOOK });
        const locale = getCurrentLocale(getState());
        return signInWithFacebook(locale, ['public_profile', 'email'])
            .then(() => {
                dispatch({ type: AUTH_SUCCESS_WITH_FACEBOOK });
            })
            .catch((error) => {
                dispatch({
                    type: AUTH_ERROR_WITH_FACEBOOK,
                    error,
                });
            });
    };
}
