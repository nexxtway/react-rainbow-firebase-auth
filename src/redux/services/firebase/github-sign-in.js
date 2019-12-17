/* eslint-disable no-param-reassign */
import * as firebase from 'firebase';
import firebaseInstance from '../../../firebase';
import getGitHubProvider from './get-github-provider';

const defaultScopes = ['user'];
const defaultLocale = 'en';

export default function signInWithGitHub(locale = defaultLocale, scopes = defaultScopes) {
    const provider = getGitHubProvider();

    if (!Array.isArray(scopes)) {
        scopes = defaultScopes;
    }

    scopes.forEach((scope) => provider.addScope(scope));
    firebase.auth().languageCode = locale;

    return firebaseInstance
        .auth()
        .signInWithPopup(provider);
}
