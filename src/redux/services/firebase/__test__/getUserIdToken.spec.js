import getUserIdToken from './../get-user-id-token';

jest.mock('./../../../../firebase', () => ({
    auth() {
        return {
            currentUser: {
                getIdToken: jest.fn(() => Promise.resolve('user token')),
            },
        };
    },
}));

describe('firebase getUserIdToken', () => {
    it('should resolve the current user token', () => {
        expect.assertions(1);
        return expect(getUserIdToken()).resolves.toBe('user token');
    });
});
