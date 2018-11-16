import loginWithGoogle from '../google-login';
import getCurrentLocale from '../../../services/app/get-current-locale';
import signInWithGoogle from '../../../services/firebase/google-sign-in';
import showErrorMessage from '../../app/show-error-message';

jest.mock('./../../../services/app/get-current-locale', () => jest.fn(() => 'en'));
jest.mock('./../../../services/firebase/google-sign-in', () => jest.fn(() => Promise.resolve()));
jest.mock('../../app/show-error-message', () => jest.fn());

describe('loginWithGoogle', () => {
    it('should dispatch AUTH_START_WITH_GOOGLE', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithGoogle()(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[0][0]).toEqual({ type: 'AUTH_START_WITH_GOOGLE' });
            });
    });

    it('should call getCurrentLocale', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithGoogle()(dispatch, getState)
            .then(() => {
                expect(getCurrentLocale).toHaveBeenCalledWith(getState());
            });
    });

    it('should call signInWithGoogle', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        signInWithGoogle.mockReset();
        signInWithGoogle.mockReturnValue(Promise.resolve());
        return loginWithGoogle()(dispatch, getState)
            .then(() => {
                expect(signInWithGoogle).toHaveBeenCalledWith('en', ['profile', 'email']);
            });
    });

    it('should dispatch AUTH_SUCCESS_WITH_GOOGLE', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithGoogle()(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[1][0]).toEqual({ type: 'AUTH_SUCCESS_WITH_GOOGLE' });
            });
    });
    it('should dispatch showErrorMessage with the error received when login with google reject', () => {
        const ERROR = 'login with google error';
        expect.assertions(2);
        const dispatch = jest.fn();
        const getState = jest.fn();
        signInWithGoogle.mockReset();
        signInWithGoogle.mockReturnValue(Promise.reject(ERROR));
        return loginWithGoogle()(dispatch, getState)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(showErrorMessage).toHaveBeenCalledWith(ERROR);
            });
    });
});
