import { Cache } from 'aws-amplify';
import forgotPasswordSubmit from './../services/forgot-password-submit';
import showErrorMessage from './show-error-message';
import history from './../../history';

export default function resetPassword({ code, newPassword }) {
    return (dispatch, getState) => {
        const { username } = getState().app.resetPasswordDetails;
        if (username) {
            forgotPasswordSubmit({ code, newPassword, username })
                .then(() => {
                    Cache.removeItem('CodeDeliveryDetails');
                    history.replace('/home/signin');
                })
                .catch((error) => {
                    dispatch(showErrorMessage(error));
                })
        } else {
            history.replace('/home/forgot-password');
        }
    }
}
