import updateUserProfile from '../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../services/firebase/change-current-user-password';
import showErrorMessage from '../app/show-error-message';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_END = 'UPDATE_PROFILE_END';

export default function updateProfile(profile) {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_START });
        const { displayName, email, password } = profile;
        let passwordPromise;
        if (password !== undefined) {
            passwordPromise = changeCurrentUserPassword(password);
        } else {
            passwordPromise = Promise.resolve();
        }
        return Promise.all([
            updateUserProfile({ displayName }),
            changeCurrentUserEmail(email),
            passwordPromise,
        ]).then(() => dispatch({ type: UPDATE_PROFILE_END }))
            .catch((error) => {
                dispatch({ type: UPDATE_PROFILE_END });
                showErrorMessage(error);
            });
    };
}
