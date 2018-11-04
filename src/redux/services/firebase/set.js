import firebase from '../../../firebase';

export default function remove(ref, data, oncomplete = () => {}) {
    return firebase
        .database()
        .ref(ref)
        .set(data, oncomplete);
}
