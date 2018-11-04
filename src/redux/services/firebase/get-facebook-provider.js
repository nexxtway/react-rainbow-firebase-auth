import * as firebase from 'firebase';

export default function getFacebookProvider() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return provider;
}
