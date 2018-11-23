import handleUpdateProfileError from '../handle-update-profile-error';
import showErrorMEssage from '../../app/show-error-message';

jest.mock('../../app/show-error-message', () => jest.fn());

describe('handleUpdateProfileError', () => {
    it('should return SHOW_REAUTHENTICATE_MODAL action if error code is "auth/requires-recent-login"', () => {
        const dispatch = jest.fn();
        handleUpdateProfileError({ code: 'auth/requires-recent-login' })(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SHOW_REAUTHENTICATE_MODAL' });
    });
    it('should return SHOW_ERROR_MESSAGE action with the error if code is not "auth/requires-recent-login"', () => {
        const dispatch = jest.fn();
        handleUpdateProfileError({ code: 'auth/new-error-code', message: 'error' })(dispatch);
        expect(showErrorMEssage).toHaveBeenCalledWith({ code: 'auth/new-error-code', message: 'error' });
    });
});
