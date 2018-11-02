import { Auth } from 'aws-amplify';

export default function forgotPasswordSubmit({ username, code, newPassword }) {
    return Auth.forgotPasswordSubmit(username, code, newPassword);
}
