import loginWithFacebook from '../facebook-login';
import getCurrentLocale from '../../../services/app/get-current-locale';
import signInWithFacebook from '../../../services/firebase/facebook-sign-in';
import showErrorMessage from '../../app/show-error-message';

jest.mock('./../../../services/app/get-current-locale', () => jest.fn(() => 'es'));
jest.mock('./../../../services/firebase/facebook-sign-in', () => jest.fn(() => Promise.resolve()));
jest.mock('../../app/show-error-message', () => jest.fn());

describe('loginWithFacebook', () => {
    it('should dispatch AUTH_START_WITH_FACEBOOK', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithFacebook()(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[0][0]).toEqual({ type: 'AUTH_START_WITH_FACEBOOK' });
            });
    });

    it('should call getCurrentLocale', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithFacebook()(dispatch, getState)
            .then(() => {
                expect(getCurrentLocale).toHaveBeenCalledWith(getState());
            });
    });

    it('should call signInWithFacebook', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        signInWithFacebook.mockReset();
        signInWithFacebook.mockReturnValue(Promise.resolve());
        return loginWithFacebook()(dispatch, getState)
            .then(() => {
                expect(signInWithFacebook).toHaveBeenCalledWith('es', ['public_profile', 'email']);
            });
    });

    it('should dispatch AUTH_SUCCESS_WITH_FACEBOOK', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return loginWithFacebook()(dispatch, getState)
            .then(() => {
                expect(dispatch.mock.calls[1][0]).toEqual({ type: 'AUTH_SUCCESS_WITH_FACEBOOK' });
            });
    });

    it('should dispatch showErrorMessage with the error received when login with facebook reject', () => {
        const ERROR = 'login with facebook error';
        expect.assertions(2);
        const dispatch = jest.fn();
        const getState = jest.fn();
        signInWithFacebook.mockReset();
        signInWithFacebook.mockReturnValue(Promise.reject(ERROR));
        return loginWithFacebook()(dispatch, getState)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(showErrorMessage).toHaveBeenCalledWith(ERROR);
            });
    });
});
