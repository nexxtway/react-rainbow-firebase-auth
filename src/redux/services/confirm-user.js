import { Auth } from 'aws-amplify';

export default function confirmUser({ username, code }) {
    return Auth.confirmSignUp(username, code, {});
}
