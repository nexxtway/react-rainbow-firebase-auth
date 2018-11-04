import firebase from './../../../firebase';

export default function remove(ref) {
    return firebase
        .database()
        .ref(ref)
        .remove();
}
