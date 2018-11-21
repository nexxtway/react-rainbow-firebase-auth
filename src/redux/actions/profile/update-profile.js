import React from 'react';
import { FormattedMessage } from 'react-intl';
import { change } from 'redux-form';
import getCurrentUser from '../../services/firebase/get-current-user';
import showSuccessMessage from '../app/show-success-message';
import updateUserData from '../authentication/update-user-data';
import resolvePromises from './resolve-promises';
import handleUpdateProfileError from './handle-update-profile-error';

export const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
export const UPDATE_PROFILE_END = 'UPDATE_PROFILE_END';


export default function updateProfile(profile) {
    return (dispatch) => {
        dispatch({ type: UPDATE_PROFILE_START });
        const { displayName, email } = profile;
        const { displayName: currentDisplayName, email: currentEmail } = getCurrentUser();
        const shouldUpdateDisplayName = displayName !== currentDisplayName;
        const shouldUpdateEmail = email !== currentEmail;
        const promises = resolvePromises(profile);

        if (promises.length > 0) {
            return Promise.all(promises).then(() => {
                if (shouldUpdateDisplayName || shouldUpdateEmail) {
                    const userData = {
                        displayName,
                        email,
                    };
                    dispatch(updateUserData(userData));
                }
                dispatch(change('profile', 'password', ''));
                dispatch({ type: UPDATE_PROFILE_END });
                dispatch(showSuccessMessage(
                    <FormattedMessage
                        id="profile.success.message"
                        defaultMesssage="Your profile information has been changed successfully." />,
                ));
            }).catch((error) => {
                dispatch(handleUpdateProfileError(error));
                dispatch({ type: UPDATE_PROFILE_END });
            });
        }
        return undefined;
    };
}
