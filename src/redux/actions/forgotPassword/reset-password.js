import { sendPasswordResetEmail } from '../../services/firebase';

export const SEND_PASS_RESET_EMAIL = 'SEND_PASS_RESET_EMAIL';
export const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT';
export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

export default function sendEmailResetPassword({ email }) {
    return (dispatch) => {
        dispatch({ type: SEND_PASS_RESET_EMAIL });
        return sendPasswordResetEmail(email)
            .then(() => {
                dispatch({ type: RESET_EMAIL_SENT });
            })
            .catch(error => dispatch({ type: SHOW_ERROR_MESSAGE, error }));
    };
}
