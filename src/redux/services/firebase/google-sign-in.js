/* eslint-disable no-param-reassign */
import firebaseInstance from '../../../firebase';
import getGoogleProvider from './get-google-provider';

export default function signInWithGoogle() {
    const provider = getGoogleProvider();

    return firebaseInstance
        .auth()
        .signInWithPopup(provider);
}
