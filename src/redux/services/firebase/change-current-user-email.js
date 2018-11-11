import getCurrentUser from './get-current-user';

export default function changeCurrentUserEmail(newEmail) {
    const currentUser = getCurrentUser();
    return currentUser.updateEmail(newEmail);
}
