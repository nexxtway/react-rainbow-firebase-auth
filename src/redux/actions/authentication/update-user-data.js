export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export default function updateUserData(data) {
    return {
        type: UPDATE_USER_DATA,
        data,
    };
}
