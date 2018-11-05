import firebase from './../../../firebase';
import getCurrentUser from './get-current-user';
import updateProfile from './update-profile';

function saveNameDb(displayName) {
    const { uid } = getCurrentUser();
    return firebase
        .database()
        .ref(`/users/${uid}/displayName`)
        .set(displayName);
}

export default function changeCurrentUserName(displayName) {
    return Promise.all([
        saveNameDb(displayName),
        updateProfile({ displayName }),
    ]);
}
