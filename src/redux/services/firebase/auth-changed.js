import firebase from '../../../firebase';

export default function onAuthStateChanged(callback) {
    firebase.auth().onAuthStateChanged(callback);
}
