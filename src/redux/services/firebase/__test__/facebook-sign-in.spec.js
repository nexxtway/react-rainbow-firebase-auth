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
    it('should return the right arguments in addScope when undefined is passed as second argument in signInWithFacebook', () => {
        const provider = getFacebookProvider();
        provider.addScope.mockReset();
        signInWithFacebook('en', undefined);
        expect(provider.addScope.mock.calls[0][0]).toBe('public_profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should return the right arguments in addScope when an object is passed as second argument in signInWithFacebook', () => {
        const provider = getFacebookProvider();
        provider.addScope.mockReset();
        signInWithFacebook('en', { test: 'testing' });
        expect(provider.addScope.mock.calls[0][0]).toBe('public_profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('email');
    });

    it('should return the right arguments in addScope when an array is passed as second argument in signInWithFacebook', () => {
        const newScopes = ['private_profile', 'phoneNumber'];
        const provider = getFacebookProvider();
        provider.addScope.mockReset();
        signInWithFacebook('en', newScopes);
        expect(provider.addScope.mock.calls[0][0]).toBe('private_profile');
        expect(provider.addScope.mock.calls[1][0]).toBe('phoneNumber');
    });

    it('should set the correct languageCode when undefined is passed as locale in signInWithFacebook', () => {
        signInWithFacebook(undefined, ['public_profile', 'email']);
        expect(firebase.auth().languageCode).toBe('en');
    });

    it('should set the correct languageCode when "fr" is passed as locale in signInWithFacebook', () => {
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
