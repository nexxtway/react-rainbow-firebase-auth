import showReauthenticateModal from './show-reauthenticate-modal';
import showErrorMessage from '../app/show-error-message';

export default function handleUpdateProfileError(error) {
    return (dispatch) => {
        const { code } = error;
        if (code === 'auth/requires-recent-login') {
            return dispatch(showReauthenticateModal());
        }
        return dispatch(showErrorMessage(error));
    };
}
