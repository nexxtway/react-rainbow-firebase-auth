import getCurrentUser from './get-current-user';

export default function changeCurrentUserPassword(newPassword) {
    const currentUser = getCurrentUser();
    return currentUser.updatePassword(newPassword);
}
