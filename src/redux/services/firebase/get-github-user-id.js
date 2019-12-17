export default function getGitHibUserId(user) {
    return user.providerData[0].uid;
}
