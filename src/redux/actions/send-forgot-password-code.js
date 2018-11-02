import { Cache } from 'aws-amplify';
import sendForgotCode from './../services/send-forgot-code';
import showErrorMessage from './show-error-message';
import history from './../../history';

export default function sendForgotPasswordCode({ username }) {
    return (dispatch) => {
        sendForgotCode(username)
            .then(({ CodeDeliveryDetails }) => {
                const in10Min = Date.now() + 5 * 60 * 1000;
                Cache.setItem('CodeDeliveryDetails', { ...CodeDeliveryDetails, username }, {
                    expires: in10Min,
                });
                history.push('/home/reset-password');
            })
            .catch((error) => {
                dispatch(showErrorMessage(error));
            })
    }
}
