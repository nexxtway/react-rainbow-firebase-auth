import loginWithGitHub from '../github-login';
import getCurrentLocale from '../../../services/app/get-current-locale';
import signInWithGitHub from '../../../services/firebase/github-sign-in';
import showErrorMessage from '../../app/show-error-message';

jest.mock('./../../../services/app/get-current-locale', () => jest.fn(() => 'en'));
jest.mock('./../../../services/firebase/github-sign-in', () => jest.fn(() => Promise.resolve()));
jest.mock('../../app/show-error-message', () => jest.fn());

describe('loginWithGitHub', () => {
    it('should dispatch AUTH_START_WITH_GITHUB', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithGitHub()(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[0][0]).toEqual({ type: 'AUTH_START_WITH_GITHUB' });
            });
    });

    it('should call getCurrentLocale', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithGitHub()(dispatch, getState)
            .then(() => {
                expect(getCurrentLocale).toHaveBeenCalledWith(getState());
            });
    });

    it('should call signInWithGitHub', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        signInWithGitHub.mockReset();
        signInWithGitHub.mockReturnValue(Promise.resolve());
        return loginWithGitHub()(dispatch, getState)
            .then(() => {
                expect(signInWithGitHub).toHaveBeenCalledWith('en', ['user']);
            });
    });

    it('should dispatch AUTH_SUCCESS_WITH_GITHUB', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithGitHub()(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[1][0]).toEqual({ type: 'AUTH_SUCCESS_WITH_GITHUB' });
            });
    });

    it('should dispatch showErrorMessage with the error received when login with github reject', () => {
        const ERROR = 'login with github error';
        expect.assertions(2);
        const dispatch = jest.fn();
        const getState = jest.fn();
        signInWithGitHub.mockReset();
        signInWithGitHub.mockReturnValue(Promise.reject(ERROR));
        return loginWithGitHub()(dispatch, getState)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(showErrorMessage).toHaveBeenCalledWith(ERROR);
            });
    });
});
