import getCurrentUser from './../get-current-user';

jest.mock('./../../../../firebase', () => ({
    auth() {
        return {
            currentUser: {
                displayName: 'Pepe',
                email: 'pepe@gmail.com',
            },
        };
    },
}));

describe('firebase getCurrentUser', () => {
    it('should resolve the current user', () => {
        expect(getCurrentUser()).toEqual({
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
        });
    });
});
