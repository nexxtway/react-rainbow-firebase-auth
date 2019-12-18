import * as firebase from 'firebase';
import signInWithGitHub from '../github-sign-in';
import firebaseInstance from '../../../../firebase';
import getGitHubProvider from '../get-github-provider';

jest.mock('../get-github-provider', () => {
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

describe('firebase signInWithGitHub', () => {
    it('should call addScope with default values when the second argument passed is undefined', () => {
        const provider = getGitHubProvider();
        provider.addScope.mockReset();
        signInWithGitHub('en', undefined);
        expect(provider.addScope.mock.calls[0][0]).toBe('user');
    });

    it('should call addScope with default values when the second argument passed is not an array', () => {
        const provider = getGitHubProvider();
        provider.addScope.mockReset();
        signInWithGitHub('en', { test: 'testing' });
        expect(provider.addScope.mock.calls[0][0]).toBe('user');
    });

    it('should call addScope with the array values passed as second argument', () => {
        const newScopes = ['test'];
        const provider = getGitHubProvider();
        provider.addScope.mockReset();
        signInWithGitHub('en', newScopes);
        expect(provider.addScope.mock.calls[0][0]).toBe('test');
    });

    it('should set the default languageCode when undefined is passed as locale', () => {
        signInWithGitHub(undefined, ['user']);
        expect(firebase.auth().languageCode).toBe('en');
    });

    it('should set the languageCode as locale passed', () => {
        signInWithGitHub('fr', ['user']);
        expect(firebase.auth().languageCode).toBe('fr');
    });

    it('should call signInWithPopup', () => {
        firebaseInstance.auth().signInWithPopup.mockReset();
        signInWithGitHub('en', ['user']);
        expect(firebaseInstance.auth().signInWithPopup).toBeCalledWith({
            addScope: expect.any(Function),
        });
    });
});
