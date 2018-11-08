/* eslint-disable no-shadow */
import getCurrentLocale from '../../services/app/get-current-locale';
import { createUser } from '../../services/firebase';
import updateUser from '../../services/registration/update-user';

export const CREATE_ACCOUNT_LOADING = 'CREATE_ACCOUNT_LOADING';
export const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
export const CREATE_ACCOUNT_ERROR = 'CREATE_ACCOUNT_ERROR';
export default function createAccount(user) {
    return (dispatch, getState) => {
        const {
            name: displayName,
            email,
            password,
        } = user;
        const locale = getCurrentLocale(getState());
        dispatch({ type: CREATE_ACCOUNT_LOADING });

        return createUser(email, password)
            .then(user => updateUser(user, { displayName, i18n: { locale } }))
            .then(() => {
                dispatch({ type: CREATE_ACCOUNT_SUCCESS });
            })
            .catch((error) => {
                dispatch({
                    type: CREATE_ACCOUNT_ERROR,
                    error,
                });
            });
    };
}
