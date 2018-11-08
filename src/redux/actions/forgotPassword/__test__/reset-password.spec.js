import sendEmailResetPassword from '../reset-password';
import sendPasswordResetEmail from '../../../services/firebase/send-password-reset-email';

jest.mock('./../../../services/firebase/send-password-reset-email', () => jest.fn());
const email = { email: 'doe@gmail.com' };

describe('sendEmailResetPassword action', () => {
    it('should dispatch SEND_PASS_RESET_EMAIL', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        sendPasswordResetEmail.mockReturnValue(Promise.resolve());
        return sendEmailResetPassword(email)(dispatch)
            .then(() => expect(dispatch.mock.calls[0][0]).toEqual({ type: 'SEND_PASS_RESET_EMAIL' }));
    });
    it('should call sendPasswordResetEmail with the email passed', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        sendPasswordResetEmail.mockReset();
        sendPasswordResetEmail.mockReturnValue(Promise.resolve());
        return sendEmailResetPassword(email)(dispatch)
            .then(() => expect(sendPasswordResetEmail).toHaveBeenCalledWith(email.email));
    });
    it('should dispatch RESET_EMAIL_SENT', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        sendPasswordResetEmail.mockReset();
        sendPasswordResetEmail.mockReturnValue(Promise.resolve());
        return sendEmailResetPassword(email)(dispatch)
            .then(() => expect(dispatch.mock.calls[1][0]).toEqual({ type: 'RESET_EMAIL_SENT' }));
    });
    it('should dispatch PASS_RESET_ERROR with the error when the reset email fails', () => {
        const ERROR = 'the email was not send';
        expect.assertions(1);
        const dispatch = jest.fn();
        sendPasswordResetEmail.mockReset();
        sendPasswordResetEmail.mockReturnValue(Promise.reject(ERROR));
        return sendEmailResetPassword(email)(dispatch)
            .then(() => expect(dispatch.mock.calls[1][0]).toEqual({
                type: 'PASS_RESET_ERROR',
                error: 'the email was not send',
            }));
    });
});
