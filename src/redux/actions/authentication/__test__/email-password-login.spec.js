import loginWithEmailAndPassword from './../email-password-login';
import handleSignInWithEmailAndPassword from './../handle-email-password-sign-in';

jest.mock('./../handle-email-password-sign-in', () => jest.fn());
const user = {
    email: 'pepe@gmail.com',
    password: '1234',
};

describe('loginWithEmailAndPassword', () => {
    it('should dispatch AUTH_START', () => {
        const dispatch = jest.fn();
        loginWithEmailAndPassword(user)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'AUTH_START' });
    });

    it('should dispatch signInWithEmailAndPassword with the user data', () => {
        const dispatch = jest.fn();
        handleSignInWithEmailAndPassword.mockReset();
        loginWithEmailAndPassword(user)(dispatch);
        expect(handleSignInWithEmailAndPassword).toHaveBeenCalledWith(user);
    });
});
