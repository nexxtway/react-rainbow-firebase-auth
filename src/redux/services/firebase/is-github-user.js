export default function isGitHubUser(user) {
    if (user.providerData && user.providerData[0].providerId === 'github.com') {
        return true;
    }
    return false;
}
