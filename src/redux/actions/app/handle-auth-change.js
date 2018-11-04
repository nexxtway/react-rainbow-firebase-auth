import saveUserLocaleInDb from '../../services/users/save-user-locale';
import { authenticateUser } from '../authentication';
import getCurrentLocale from '../../services/app/get-current-locale';

export const START_APP_INITIALIZATION = 'START_APP_INITIALIZATION';
function startAppInitialization() {
    return {
        type: START_APP_INITIALIZATION,
    };
}

export const DONE_APP_INITIALIZATION = 'DONE_APP_INITIALIZATION';
function doneAppInitialization() {
    return {
        type: DONE_APP_INITIALIZATION,
    };
}

export default function handleAuthenticationChange(user) {
    return (dispatch, getState) => {
        const locale = getCurrentLocale(getState());
        if (user) {
            saveUserLocaleInDb(locale);
            dispatch(startAppInitialization());
            setTimeout(() => {
                dispatch(authenticateUser(user));
                dispatch(doneAppInitialization());
            }, 0);
        } else {
            dispatch(doneAppInitialization());
        }
    };
}
