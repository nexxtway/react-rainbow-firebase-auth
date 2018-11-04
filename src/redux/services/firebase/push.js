import firebase from './../../../firebase';

export default function push(ref, data) {
    return new Promise((resolve, reject) => {
        const newRef = firebase
            .database()
            .ref(ref)
            .push();

        newRef.set(data, (err) => {
            if (err) return reject(err);
            return resolve(newRef.key);
        });
    });
}
