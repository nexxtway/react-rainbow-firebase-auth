import getCurrentUser from '../../services/firebase/get-current-user';
import updateUserProfile from '../../services/firebase/update-profile';
import changeCurrentUserEmail from '../../services/firebase/change-current-user-email';
import changeCurrentUserPassword from '../../services/firebase/change-current-user-password';

export default function resolvePromises(profile) {
    const { displayName, email, password } = profile;
    const { displayName: currentDisplayName, email: currentEmail } = getCurrentUser();
    const promises = [];
    const shouldUpdateDisplayName = displayName !== currentDisplayName;
    const shouldUpdateEmail = email !== currentEmail;

    if (shouldUpdateDisplayName) {
        promises.push(updateUserProfile({ displayName }));
    }
    if (shouldUpdateEmail) {
        promises.push(changeCurrentUserEmail(email));
    }
    if (password !== undefined) {
        promises.push(changeCurrentUserPassword(password));
    }
    return promises;
}
