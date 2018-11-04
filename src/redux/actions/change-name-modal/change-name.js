import changeUserName from './../../services/firebase/change-current-user-name';

export const CHANGING_NAME = 'CHANGING_NAME';
function changingName() {
    return { type: CHANGING_NAME };
}

export const NAME_CHANGED = 'NAME_CHANGED';
function nameChanged(displayName) {
    return {
        type: NAME_CHANGED,
        displayName,
    };
}

export const ERROR_CHANGING_NAME = 'ERROR_CHANGING_NAME';
function errorChangingName(error) {
    return {
        type: ERROR_CHANGING_NAME,
        error,
    };
}

export default function changeName({ displayName }) {
    return (dispatch) => {
        dispatch(changingName());
        return changeUserName(displayName)
            .then(() => dispatch(nameChanged(displayName)))
            .catch(error => dispatch(errorChangingName(error)));
    };
}
