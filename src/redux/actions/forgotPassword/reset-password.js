import { sendPasswordResetEmail } from './../services/firebase';
import GA from './../../ga';

export const SEND_PASS_RESET_EMAIL = 'SEND_PASS_RESET_EMAIL';
export const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT';
export const PASS_RESET_ERROR = 'PASS_RESET_ERROR';

export default function sendEmailResetPassword(email) {
    return (dispatch) => {
        dispatch({ type: SEND_PASS_RESET_EMAIL });
        return sendPasswordResetEmail(email)
            .then(() => {
                GA.event({
                    category: 'User',
                    action: 'Forgot password',
                    label: email,
                });
                dispatch({ type: RESET_EMAIL_SENT });
            })
            .catch(error => dispatch({ type: PASS_RESET_ERROR, error }));
    };
}
