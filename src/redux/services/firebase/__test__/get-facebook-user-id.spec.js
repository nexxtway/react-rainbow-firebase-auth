import getFacebookUserId from './../get-facebook-user-id';

describe('getFacebookUserId service', () => {
    it('should return the facebook user id', () => {
        const user = {
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
            providerData: [
                { uid: 'fb_user_123' },
            ],
        };
        expect(getFacebookUserId(user)).toBe('fb_user_123');
    });
});
