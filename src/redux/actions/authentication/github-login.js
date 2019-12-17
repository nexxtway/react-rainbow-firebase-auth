import getCurrentLocale from '../../services/app/get-current-locale';
import { signInWithGitHub } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';

export const AUTH_START_WITH_GITHUB = 'AUTH_START_WITH_GITHUB';
export const AUTH_SUCCESS_WITH_GITHUB = 'AUTH_SUCCESS_WITH_GITHUB';

export default function loginWithGitHub() {
    return (dispatch, getState) => {
        dispatch({ type: AUTH_START_WITH_GITHUB });
        const locale = getCurrentLocale(getState());
        return signInWithGitHub(locale, ['profile', 'email'])
            .then(() => {
                dispatch({ type: AUTH_SUCCESS_WITH_GITHUB });
            })
            .catch((error) => dispatch(showErrorMessage(error)));
    };
}
