import { sendPasswordResetEmail } from '../../services/firebase';
import showErrorMessage from '../app/show-error-message';

export const SEND_PASS_RESET_EMAIL = 'SEND_PASS_RESET_EMAIL';
export const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT';

export default function sendEmailResetPassword({ email }) {
    return (dispatch) => {
        dispatch({ type: SEND_PASS_RESET_EMAIL });
        return sendPasswordResetEmail(email)
            .then(() => {
                dispatch({ type: RESET_EMAIL_SENT });
            })
            .catch(error => dispatch(showErrorMessage(error)));
    };
}
