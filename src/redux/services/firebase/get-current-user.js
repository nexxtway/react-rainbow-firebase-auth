import firebase from './../../../firebase';

export default function getCurrentUser() {
    return firebase.auth().currentUser;
}
