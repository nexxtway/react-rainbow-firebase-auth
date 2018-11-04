import firebase from '../../../firebase';

export default function authStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
}
