import { Auth } from 'aws-amplify';

export default function authStateChanged() {
    return Auth.currentAuthenticatedUser();
}
