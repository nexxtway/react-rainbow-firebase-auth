import getCurrentUser from './get-current-user';

export default function updateProfile(profile) {
    const user = getCurrentUser();
    return user.updateProfile(profile);
}
