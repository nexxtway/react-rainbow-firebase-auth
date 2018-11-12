import updateUserProfile from '../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../services/firebase/change-current-user-password';
import getCurrentUser from '../../services/firebase/get-current-user';
import showErrorMessage from '../app/show-error-message';
import updateUserData from '../authentication/update-user-data';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_END = 'UPDATE_PROFILE_END';

export default function updateProfile(profile) {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_START });
        const { displayName, email, password } = profile;
        const { displayName: currentDisplayName, email: currentEmail } = getCurrentUser();
        const promises = [];

        if (displayName !== currentDisplayName) {
            promises.push(updateUserProfile({ displayName }));
        }
        if (email !== currentEmail) {
            promises.push(changeCurrentUserEmail(email));
        }
        if (password !== undefined) {
            promises.push(changeCurrentUserPassword(password));
        }

        if (promises.length > 0) {
            return Promise.all(promises).then(() => {
                const userData = {
                    displayName,
                    email,
                };
                dispatch(updateUserData(userData));
                dispatch({ type: UPDATE_PROFILE_END });
            }).catch((error) => {
                dispatch({ type: UPDATE_PROFILE_END });
                dispatch(showErrorMessage(error));
            });
        }
        return undefined;
    };
}
