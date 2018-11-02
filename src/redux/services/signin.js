import { Auth } from 'aws-amplify';

export default function signin({ username, password }) {
    return Auth.signIn(username, password);
}
