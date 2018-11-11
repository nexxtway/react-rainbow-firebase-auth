import * as firebase from 'firebase';

export default function getGoogleProvider() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return provider;
}
