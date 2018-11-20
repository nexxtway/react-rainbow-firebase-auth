import * as firebase from 'firebase';
import signInWithGoogle from '../google-sign-in';
import firebaseInstance from '../../../../firebase';
import getGoogleProvider from '../get-google-provider';

jest.mock('../get-google-provider', () => {
    const addScope = jest.fn();
    return () => ({ addScope });
});

jest.mock('../../../../firebase', () => {
    const signInWithPopup = jest.fn();
    const auth = () => ({ signInWithPopup });
    return { auth };
});

jest.mock('firebase', () => {
    const obj = {};
    const auth = () => obj;
    return { auth };
});

describe('firebase signInWithGoogle', () => {
    it('should return the right arguments in addScope when undefined is passed as second argument in signInWithGoogle', () => {
        const provider = getGoogleProvider();
        provider.addScope.mockReset();
        signInWithGoogle('en', undefined);
        expect(provider.addScope.mock.calls[0][0]).toBe('profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should return the right arguments in addScope when an object is passed as second argument in signInWithGoogle', () => {
        const provider = getGoogleProvider();
        provider.addScope.mockReset();
        signInWithGoogle('en', { test: 'testing' });
        expect(provider.addScope.mock.calls[0][0]).toBe('profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should return the right arguments in addScope when an array is passed as second argument in signInWithGoogle', () => {
        const newScopes = ['profile', 'phoneNumber'];
        const provider = getGoogleProvider();
        provider.addScope.mockReset();
        signInWithGoogle('en', newScopes);
        expect(provider.addScope.mock.calls[0][0]).toBe('profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('phoneNumber');
    });

    it('should set the correct languageCode when undefined is passed as locale in signInWithGoogle', () => {
        signInWithGoogle(undefined, ['profile', 'email']);
        expect(firebase.auth().languageCode).toBe('en');
    });

    it('should set the correct languageCode when "fr" is passed as locale in signInWithGoogle', () => {
        signInWithGoogle('fr', ['profile', 'email']);
        expect(firebase.auth().languageCode).toBe('fr');
    });

    it('should call signInWithPopup', () => {
        firebaseInstance.auth().signInWithPopup.mockReset();
        signInWithGoogle('en', ['profile', 'email']);
        expect(firebaseInstance.auth().signInWithPopup).toBeCalledWith({
            addScope: expect.any(Function),
        });
    });
});
