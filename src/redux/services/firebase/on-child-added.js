import firebase from '../../../firebase';
import processRecord from './process-record';

export default function onChildAdded(ref, callback, key) {
    return firebase
        .database()
        .ref(ref)
        .on('child_added', snapshot => processRecord(snapshot, callback, key));
}
