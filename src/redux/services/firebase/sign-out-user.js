import firebase from '../../../firebase';

export default function signOutUser() {
    return firebase.auth().signOut();
}
