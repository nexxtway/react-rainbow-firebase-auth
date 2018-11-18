import authenticateUser, { USER_AUTHENTICATED } from './authenticate-user';
import logoutUser, { USER_LOGOUT_DONE } from './logout-user';
import loginWithFacebook, {
    AUTH_START_WITH_FACEBOOK,
    AUTH_SUCCESS_WITH_FACEBOOK,
} from './facebook-login';
import loginWithGoogle, {
    AUTH_START_WITH_GOOGLE,
    AUTH_SUCCESS_WITH_GOOGLE,
} from './google-login';
import loginWithEmailAndPassword, { AUTH_START } from './email-password-login';
import { AUTH_SUCCESS } from './handle-email-password-sign-in';
import updateUserData, { UPDATE_USER_DATA } from './update-user-data';

export {
    USER_AUTHENTICATED,
    authenticateUser,
    USER_LOGOUT_DONE,
    logoutUser,
    loginWithFacebook,
    AUTH_START_WITH_FACEBOOK,
    AUTH_SUCCESS_WITH_FACEBOOK,
    loginWithGoogle,
    AUTH_START_WITH_GOOGLE,
    AUTH_SUCCESS_WITH_GOOGLE,
    AUTH_START,
    AUTH_SUCCESS,
    loginWithEmailAndPassword,
    UPDATE_USER_DATA,
    updateUserData,
};
