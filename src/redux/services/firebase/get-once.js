import firebase from '../../../firebase';

export default function getOnce(ref) {
    return firebase
        .database()
        .ref(ref)
        .once('value')
        .then(snapshot => snapshot.val());
}
