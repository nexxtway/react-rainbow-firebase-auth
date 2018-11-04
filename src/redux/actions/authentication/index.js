import authenticateUser, { AUTHENTICATE_USER } from './authenticate-user';
import logoutUser, { UNAUTHENTICATE_USER } from './unauthenticate-user';
import loginWithFacebook, {
    AUTH_START_WITH_FACEBOOK,
    AUTH_SUCCESS_WITH_FACEBOOK,
    AUTH_ERROR_WITH_FACEBOOK,
} from './facebook-login';
import loginWithEmailAndPassword, { AUTH_START } from './email-password-login';
import { AUTH_SUCCESS, AUTH_ERROR } from './handle-email-password-sign-in';
import resetAuthForm, { AUTH_RESET_FORM } from './reset-auth-form';
import updateUserData, { UPDATE_USER_DATA } from './update-user-data';

export {
    AUTHENTICATE_USER,
    authenticateUser,
    UNAUTHENTICATE_USER,
    logoutUser,
    loginWithFacebook,
    AUTH_START_WITH_FACEBOOK,
    AUTH_SUCCESS_WITH_FACEBOOK,
    AUTH_ERROR_WITH_FACEBOOK,
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_ERROR,
    loginWithEmailAndPassword,
    AUTH_RESET_FORM,
    resetAuthForm,
    UPDATE_USER_DATA,
    updateUserData,
};
