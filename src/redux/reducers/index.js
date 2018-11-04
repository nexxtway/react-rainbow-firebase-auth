import authentication from './authentication';
import registration from './registration';
import forgot from './forgotPassword';
import app from './app/index';
import changeNameModal from './change-name-modal';
import changePasswordModal from './change-password-modal';
import i18n from './../../i18n/reducer';

export default {
    app,
    authentication,
    registration,
    forgot,
    changeNameModal,
    changePasswordModal,
    i18n,
};
