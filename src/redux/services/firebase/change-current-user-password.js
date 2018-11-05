import getCurrentUser from './get-current-user';

export default function changeCurrentUserName(newPassword) {
    const currentUser = getCurrentUser();
    return currentUser.updatePassword(newPassword);
}
