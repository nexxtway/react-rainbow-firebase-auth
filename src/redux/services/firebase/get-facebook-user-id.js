export default function getFacebookUserId(user) {
    return user.providerData[0].uid;
}
