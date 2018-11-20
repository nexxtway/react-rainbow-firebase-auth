import reauthenticateUser from './reauthenticate-user';
import showErrorMessage from '../app/show-error-message';
import updateProfile from './update-profile';
import hideReauthenticateModal from './hide-reauthenticate-modal';

export default function handleReauthentication(credentials, currentValues) {
    return dispatch => reauthenticateUser(credentials).then(() => {
        dispatch(hideReauthenticateModal());
        updateProfile(currentValues)(dispatch);
    }).catch((error) => {
        dispatch(showErrorMessage(error));
    });
}
