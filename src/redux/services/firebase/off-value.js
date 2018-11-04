import firebase from '../../../firebase';

export default function offValue(ref, callback) {
    return firebase
        .database()
        .ref(ref)
        .off('value', callback);
}
