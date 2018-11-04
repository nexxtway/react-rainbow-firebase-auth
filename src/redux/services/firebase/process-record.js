export default function processRecord(snapshot, callback, key = 'id') {
    if (snapshot.exists()) {
        const id = snapshot.key;
        const data = snapshot.val();
        callback({ [key]: id, ...data });
    }
}
