import { createUser, updateProfile } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';
import updateUserData from '../authentication/update-user-data';

export const CREATE_ACCOUNT_LOADING = 'CREATE_ACCOUNT_LOADING';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export default function createAccount(user) {
    return (dispatch) => {
        const {
            name: displayName,
            email,
            password,
        } = user;
        dispatch({ type: CREATE_ACCOUNT_LOADING });

        return createUser(email, password)
            .then(() => updateProfile({ displayName }))
            .then(() => {
                dispatch(updateUserData({ displayName }));
                dispatch({ type: CREATE_ACCOUNT_SUCCESS });
            })
            .catch((error) => dispatch(showErrorMessage(error)));
    };
}
