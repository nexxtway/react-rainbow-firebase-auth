export default function isFacebookUser(user) {
    if (user.providerData && user.providerData[0].providerId === 'facebook.com') {
        return true;
    }
    return false;
}
