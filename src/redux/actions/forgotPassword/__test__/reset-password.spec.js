import sendEmailResetPassword from '../reset-password';
import sendPasswordResetEmail from '../../../services/firebase/send-password-reset-email';
import showErrorMessage from '../../app/show-error-message';

jest.mock('./../../../services/firebase/send-password-reset-email', () => jest.fn());
jest.mock('../../app/show-error-message', () => jest.fn());
jest.mock('../../../../history', () => jest.fn());

const email = { email: 'doe@gmail.com' };

describe('sendEmailResetPassword action', () => {
    it('should dispatch SEND_PASS_RESET_EMAIL', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        sendPasswordResetEmail.mockReturnValue(Promise.resolve());
        return sendEmailResetPassword(email)(dispatch)
            .then(() => expect(dispatch.mock.calls[0][0]).toEqual({
                email: 'doe@gmail.com',
                type: 'SEND_PASS_RESET_EMAIL',
            }));
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
    it('should dispatch showErrorMessage with the error when the reset email fails', () => {
        const ERROR = 'the email was not send';
        expect.assertions(2);
        const dispatch = jest.fn();
        sendPasswordResetEmail.mockReset();
        sendPasswordResetEmail.mockReturnValue(Promise.reject(ERROR));
        return sendEmailResetPassword(email)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(showErrorMessage).toHaveBeenCalledWith(ERROR);
            });
    });
});
