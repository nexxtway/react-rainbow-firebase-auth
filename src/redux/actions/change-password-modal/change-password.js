import changeUserPassword from './../../services/firebase/change-current-user-password';

export const CHANGING_PASSWORD = 'CHANGING_PASSWORD';
function changingPassword() {
    return { type: CHANGING_PASSWORD };
}

export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
function passwordChanged() {
    return { type: PASSWORD_CHANGED };
}

export const ERROR_CHANGING_PASSWORD = 'ERROR_CHANGING_PASSWORD';
function errorChangingPassword(error) {
    return {
        type: ERROR_CHANGING_PASSWORD,
        error,
    };
}

export default function changeName({ newPassword }) {
    return (dispatch) => {
        dispatch(changingPassword());
        return changeUserPassword(newPassword)
            .then(() => dispatch(passwordChanged()))
            .catch(error => dispatch(errorChangingPassword(error)));
    };
}
