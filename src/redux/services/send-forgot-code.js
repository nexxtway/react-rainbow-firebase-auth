import { Auth } from 'aws-amplify';

export default function sendForgotCode(username) {
    return Auth.forgotPassword(username);
}
