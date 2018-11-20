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
    it('should call addScope with default values when the second argument passed is undefined', () => {
        const provider = getGoogleProvider();
        provider.addScope.mockReset();
        signInWithGoogle('en', undefined);
        expect(provider.addScope.mock.calls[0][0]).toBe('profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should call addScope with default values when the second argument passed is not an array', () => {
        const provider = getGoogleProvider();
        provider.addScope.mockReset();
        signInWithGoogle('en', { test: 'testing' });
        expect(provider.addScope.mock.calls[0][0]).toBe('profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should call addScope with default values when the second argument passed is a custom array', () => {
        const newScopes = ['profile', 'phoneNumber'];
        const provider = getGoogleProvider();
        provider.addScope.mockReset();
        signInWithGoogle('en', newScopes);
        expect(provider.addScope.mock.calls[0][0]).toBe('profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('phoneNumber');
    });

    it('should set the default languageCode when undefined is passed as locale', () => {
        signInWithGoogle(undefined, ['profile', 'email']);
        expect(firebase.auth().languageCode).toBe('en');
    });

    it('should set the languageCode as locale passed', () => {
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
