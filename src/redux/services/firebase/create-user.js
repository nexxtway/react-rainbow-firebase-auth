import firebase from '../../../firebase';

export default function createUser(email, password) {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
}
