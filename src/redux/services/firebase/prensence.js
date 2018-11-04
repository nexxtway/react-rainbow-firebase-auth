import firebase from 'firebase';
import firebaseInstance from './../../../firebase';

const isOfflineForDatabase = () => ({
    status: 'OFFLINE',
    lastSignInTime: firebase.database.ServerValue.TIMESTAMP,
});

const isOnlineForDatabase = () => ({
    status: 'ONLINE',
    lastSignInTime: firebase.database.ServerValue.TIMESTAMP,
});

export default function startPresenceLogs() {
    const uid = firebaseInstance.auth().currentUser.uid;
    const userStatusRef = firebaseInstance.database().ref(`/users/${uid}/metadata`);

    firebaseInstance.database().ref('.info/connected').on('value', (snapshot) => {
        if (snapshot.val() === false) {
            return;
        }
        userStatusRef.onDisconnect()
            .update(isOfflineForDatabase())
            .then(() => userStatusRef.update(isOnlineForDatabase()));
    });
}
