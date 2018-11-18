import React from 'react';
import { FormattedMessage } from 'react-intl';
import { change } from 'redux-form';
import updateUserProfile from '../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../services/firebase/change-current-user-password';
import getCurrentUser from '../../services/firebase/get-current-user';
import showErrorMessage from '../app/show-error-message';
import showSuccessMessage from '../app/show-success-message';
import updateUserData from '../authentication/update-user-data';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_END = 'UPDATE_PROFILE_END';

export default function updateProfile(profile) {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_START });
        const { displayName, email, password } = profile;
        const { displayName: currentDisplayName, email: currentEmail } = getCurrentUser();
        const promises = [];
        const shouldUpdateDisplayName = displayName !== currentDisplayName;
        const shouldUpdateEmail = email !== currentEmail;

        if (shouldUpdateDisplayName) {
            promises.push(updateUserProfile({ displayName }));
        }
        if (shouldUpdateEmail) {
            promises.push(changeCurrentUserEmail(email));
        }
        if (password !== undefined) {
            promises.push(changeCurrentUserPassword(password));
        }

        if (promises.length > 0) {
            return Promise.all(promises).then(() => {
                if (shouldUpdateDisplayName || shouldUpdateEmail) {
                    const userData = {
                        displayName,
                        email,
                    };
                    dispatch(change('profile', 'password', ''));
                    dispatch(updateUserData(userData));
                }
                dispatch({ type: UPDATE_PROFILE_END });
                dispatch(showSuccessMessage(
                    <FormattedMessage
                        id="profile.success.message"
                        defaultMesssage="Your profile information has been changed successfully." />,
                ));
            }).catch((error) => {
                dispatch({ type: UPDATE_PROFILE_END });
                dispatch(showErrorMessage(error));
            });
        }
        return undefined;
    };
}
