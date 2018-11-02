import { Auth } from 'aws-amplify';

export default function signout() {
    return Auth.signOut();
}
