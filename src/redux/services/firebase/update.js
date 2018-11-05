import firebase from './../../../firebase';

export default function update(ref, data) {
    return firebase
        .database()
        .ref(ref)
        .update(data);
}
