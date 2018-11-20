import * as firebase from 'firebase';
import signInWithFacebook from '../facebook-sign-in';
import firebaseInstance from '../../../../firebase';
import getFacebookProvider from '../get-facebook-provider';

jest.mock('../get-facebook-provider', () => {
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

describe('firebase signInWithFacebook', () => {
    it('should call addScope with default values when the second argument passed is undefined', () => {
        const provider = getFacebookProvider();
        provider.addScope.mockReset();
        signInWithFacebook('en', undefined);
        expect(provider.addScope.mock.calls[0][0]).toBe('public_profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should call addScope with default values when the second argument passed is not an array', () => {
        const provider = getFacebookProvider();
        provider.addScope.mockReset();
        signInWithFacebook('en', { test: 'testing' });
        expect(provider.addScope.mock.calls[0][0]).toBe('public_profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should call addScope with the array values passed as second argument', () => {
        const newScopes = ['private_profile', 'phoneNumber'];
        const provider = getFacebookProvider();
        provider.addScope.mockReset();
        signInWithFacebook('en', newScopes);
        expect(provider.addScope.mock.calls[0][0]).toBe('private_profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('phoneNumber');
    });

    it('should set the default languageCode when undefined is passed as locale', () => {
        signInWithFacebook(undefined, ['public_profile', 'email']);
        expect(firebase.auth().languageCode).toBe('en');
    });

    it('should set the languageCode as locale passed', () => {
        signInWithFacebook('fr', ['public_profile', 'email']);
        expect(firebase.auth().languageCode).toBe('fr');
    });

    it('should call signInWithPopup', () => {
        firebaseInstance.auth().signInWithPopup.mockReset();
        signInWithFacebook('en', ['public_profile', 'email']);
        expect(firebaseInstance.auth().signInWithPopup).toBeCalledWith({
            addScope: expect.any(Function),
        });
    });
});
