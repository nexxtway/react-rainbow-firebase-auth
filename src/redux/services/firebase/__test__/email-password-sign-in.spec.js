import signInWithEmailAndPassword from './../email-password-sign-in';

jest.mock('./../../../../firebase', () => ({
    auth() {
        return {
            signInWithEmailAndPassword: jest.fn(() => Promise.resolve({
                email: 'john@gmail.com',
                password: '1234',
                uid: 'cus_1',
            })),
        };
    },
}));

describe('firebase signInWithEmailAndPassword', () => {
    it('should resolve the user data', () => {
        expect.assertions(1);
        return signInWithEmailAndPassword('john@gmail.com', '1234')
            .then((user) => {
                expect(user).toEqual({
                    email: 'john@gmail.com',
                    password: '1234',
                    uid: 'cus_1',
                });
            });
    });
});
