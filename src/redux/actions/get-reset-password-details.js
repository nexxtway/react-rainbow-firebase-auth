import { Cache } from 'aws-amplify';
import history from './../../history';

export const RESET_PASSWORD_DETAILS = 'RESET_PASSWORD_DETAILS';
export default function getResetPasswordDetails() {
    const details = Cache.getItem('CodeDeliveryDetails');
    if (details) {
        return {
            type: RESET_PASSWORD_DETAILS,
            details,
        }
    }
    return () => {
        history.replace('/home/forgot-password');
    }
}
