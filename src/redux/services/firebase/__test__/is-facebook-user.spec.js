import isFacebookUser from '../is-facebook-user';

describe('isFacebookUser service', () => {
    it('should return false if the user passed is not from facebook', () => {
        const user = {
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
        };
        expect(isFacebookUser(user)).toBe(false);
    });
    it('should return true if the user passed is from facebook', () => {
        const user = {
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
            providerData: [
                { providerId: 'facebook.com' },
            ],
        };
        expect(isFacebookUser(user)).toBe(true);
    });
});
