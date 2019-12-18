import getUserIdToken from './get-user-id-token';
import getCurrentUser from './get-current-user';
import onAuthStateChanged from './auth-changed';
import signInWithEmailAndPassword from './email-password-sign-in';
import signInWithFacebook from './facebook-sign-in';
import signInWithGoogle from './google-sign-in';
import signInWithGitHub from './github-sign-in';
import isGitHubUser from './is-github-user';
import getGitHubUserId from './get-github-user-id';
import signOutUser from './sign-out-user';
import sendPasswordResetEmail from './send-password-reset-email';
import createUser from './create-user';
import isFacebookUser from './is-facebook-user';
import getFacebookUserId from './get-facebook-user-id';
import updateProfile from './update-profile';

export {
    getUserIdToken,
    getCurrentUser,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithFacebook,
    signInWithGoogle,
    signOutUser,
    sendPasswordResetEmail,
    createUser,
    isFacebookUser,
    getFacebookUserId,
    updateProfile,
    signInWithGitHub,
    isGitHubUser,
    getGitHubUserId,
};
