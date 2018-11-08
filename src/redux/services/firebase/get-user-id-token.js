import firebase from '../../../firebase';

export default function getUserIdToken(forceRefresh = true) {
    return firebase
        .auth()
        .currentUser
        .getIdToken(forceRefresh);
}
