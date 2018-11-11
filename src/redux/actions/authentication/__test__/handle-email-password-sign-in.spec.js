import handleSignInWithEmailAndPassword from '../handle-email-password-sign-in';
import signInWithEmailAndPassword from '../../../services/firebase/email-password-sign-in';
import showErrorMessage from '../../app/show-error-message';

jest.mock('./../../../services/firebase/email-password-sign-in', () => jest.fn(() => Promise.resolve({
    email: 'pepe@gmail.com',
    password: '1234',
    uid: 'cus_1',
})));
jest.mock('../../app/show-error-message', () => jest.fn());

const user = {
    email: 'pepe@gmail.com',
    password: '1234',
};

describe('handleSignInWithEmailAndPassword', () => {
    it('should call signInWithEmailAndPassword with the user data passed to handleSignInWithEmailAndPassword', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        return handleSignInWithEmailAndPassword(user)(dispatch)
            .then(() => {
                expect(signInWithEmailAndPassword).toHaveBeenCalledWith('pepe@gmail.com', '1234');
            });
    });

    it('should dispatch AUTH_SUCCESS', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        return handleSignInWithEmailAndPassword(user)(dispatch)
            .then(() => {
                expect(dispatch.mock.calls[0][0]).toEqual({ type: 'AUTH_SUCCESS' });
            });
    });

    it('should dispatch showErrorMessage with the error rejected', () => {
        const ERROR = 'The user does not exist';
        expect.assertions(2);
        const dispatch = jest.fn();
        signInWithEmailAndPassword.mockReset();
        signInWithEmailAndPassword.mockReturnValue(Promise.reject(ERROR));
        return handleSignInWithEmailAndPassword(user)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(1);
                expect(showErrorMessage).toHaveBeenCalledWith(ERROR);
            });
    });
});
