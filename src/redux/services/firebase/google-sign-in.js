/* eslint-disable no-param-reassign */
import * as firebase from 'firebase';
import firebaseInstance from '../../../firebase';
import getGoogleProvider from './get-google-provider';

const defaultScopes = ['public_profile', 'email'];
const defaultLocale = 'en';

export default function signInWithFacebook(locale = defaultLocale, scopes = defaultScopes) {
    const provider = getGoogleProvider();

    if (!Array.isArray(scopes)) {
        scopes = defaultScopes;
    }

    scopes.forEach(scope => provider.addScope(scope));
    firebase.auth().languageCode = locale;
    return firebaseInstance
        .auth()
        .signInWithPopup(provider);
}
