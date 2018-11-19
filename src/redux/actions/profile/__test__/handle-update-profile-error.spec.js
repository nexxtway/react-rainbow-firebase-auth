import handleUpdateProfileError from '../handle-update-profile-error';

jest.mock('../../app/show-error-message', () => jest.fn(error => ({
    type: 'SHOW_ERROR_MESSAGE',
    message: error.message,
})));

describe('handleUpdateProfileError', () => {
    it('should return SHOW_REAUTHENTICATE_MODAL action if error code is "auth/requires-recent-login"', () => {
        const action = handleUpdateProfileError({ code: 'auth/requires-recent-login' });
        expect(action).toEqual({ type: 'SHOW_REAUTHENTICATE_MODAL' });
    });
    it('should return SHOW_ERROR_MESSAGE action with the error if code is not "auth/requires-recent-login"', () => {
        const action = handleUpdateProfileError({ code: 'auth/new-error-code', message: 'error' });
        expect(action).toEqual({
            type: 'SHOW_ERROR_MESSAGE',
            message: 'error',
        });
    });
});
