import showReauthenticateModal from './show-reauthenticate-modal';
import showErrorMessage from '../app/show-error-message';

export default function handleUpdateProfileError(error) {
    const { code } = error;
    if (code === 'auth/requires-recent-login') {
        return showReauthenticateModal();
    }
    return showErrorMessage(error);
}
