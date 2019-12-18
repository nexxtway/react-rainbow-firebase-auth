import {
    isFacebookUser,
    getFacebookUserId,
    isGitHubUser,
    getGitHubUserId,
} from '../../services/firebase';

export default function getUserPhotoURL(user) {
    if (isFacebookUser(user)) {
        const facebookUserId = getFacebookUserId(user);
        return `https://graph.facebook.com/v2.12/${facebookUserId}/picture?type=large`;
    }
    if (isGitHubUser(user)) {
        const gitHubUserId = getGitHubUserId(user);
        return `https://avatars0.githubusercontent.com/u/${gitHubUserId}?v=4`;
    }
    return null;
}
