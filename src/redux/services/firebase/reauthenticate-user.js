import firebase from 'firebase';
import getCurrentUser from './get-current-user';

export default function reauthenticateUser({ email, password }) {
    const credentials = firebase.auth.EmailAuthProvider.credential(email, password);
    const user = getCurrentUser();
    return user.reauthenticateWithCredential(credentials);
}
