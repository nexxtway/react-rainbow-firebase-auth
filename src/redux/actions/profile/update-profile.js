import updateUserProfile from '../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../services/firebase/change-current-user-password';
import showErrorMessage from '../app/show-error-message';
import updateUserData from '../authentication/update-user-data';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_END = 'UPDATE_PROFILE_END';

export default function updateProfile(profile) {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_START });
        const { displayName, email, password } = profile;

        return updateUserProfile({ displayName })
            .then(() => {
                dispatch(updateUserData({ displayName }));
                return changeCurrentUserEmail(email);
            })
            .then(() => {
                dispatch(updateUserData({ email }));
                if (password !== undefined) {
                    return changeCurrentUserPassword(password);
                }
                return Promise.resolve();
            })
            .then(() => dispatch({ type: UPDATE_PROFILE_END }))
            .catch((error) => {
                dispatch({ type: UPDATE_PROFILE_END });
                dispatch(showErrorMessage(error));
            });
    };
}
