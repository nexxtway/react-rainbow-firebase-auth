import { authenticateUser } from '../authentication';

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
    return (dispatch) => {
        if (user) {
            dispatch(startAppInitialization());
            dispatch(authenticateUser(user));
            dispatch(doneAppInitialization());
        } else {
            dispatch(doneAppInitialization());
        }
    };
}
