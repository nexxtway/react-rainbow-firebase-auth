/* eslint-disable no-param-reassign */
import * as firebase from 'firebase';
import firebaseInstance from '../../../firebase';
import getFacebookProvider from './get-facebook-provider';

const defaultScopes = ['public_profile', 'email'];
const defaultLocale = 'en';

export default function signInWithFacebook(locale = defaultLocale, scopes = defaultScopes) {
    const provider = getFacebookProvider();

    if (!Array.isArray(scopes)) {
        scopes = defaultScopes;
    }

    scopes.forEach((scope) => provider.addScope(scope));
    firebase.auth().languageCode = locale;
    return firebaseInstance
        .auth()
        .signInWithPopup(provider);
}
