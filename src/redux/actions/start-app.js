import authStateChanged from './../services/auth-state-changed';
import { authenticate } from './authenticate';
import { unauthenticate } from './unauthenticate';
import history from './../../history';
import hideErrorMessage from './hide-error-message';

export const INIT_APP = 'INIT_APP';
function initApp() {
    return {
        type: INIT_APP,
    }
}

export default function startApp() {
    return (dispatch) => {
        dispatch(initApp());

        authStateChanged()
            .then(user => {
                dispatch(authenticate(user));
            })
            .catch(() => {
                dispatch(unauthenticate())
            });

        history.listen(() => {
            dispatch(hideErrorMessage());
        })
    }
}
