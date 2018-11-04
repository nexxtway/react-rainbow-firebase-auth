import firebase from '../../../firebase';

export default function onValue(ref, callback, cancelCallback) {
    return firebase
        .database()
        .ref(ref)
        .on('value', (snapshot) => {
            callback(snapshot.val());
        }, cancelCallback);
}
