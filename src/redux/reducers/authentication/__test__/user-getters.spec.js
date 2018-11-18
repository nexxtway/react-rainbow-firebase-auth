import * as userGetters from '../user-getters';

describe('userGetters', () => {
    describe('isFacebookUser', () => {
        it('should return true when providerId is facebook.com', () => {
            const userData = {
                providerData: [{
                    providerId: 'facebook.com',
                    email: 'user@gmail.com',
                }],
                ...userGetters,
            };
            expect(userData.isFacebookUser()).toBe(true);
        });
        it('should return false when providerId is not facebook.com', () => {
            const userData = {
                providerData: [{
                    providerId: 'rainbow.com',
                    email: 'user@gmail.com',
                }],
                ...userGetters,
            };
            expect(userData.isFacebookUser()).toBe(false);
        });
    });
    describe('isGoogleUser', () => {
        it('should return true when providerId is google.com', () => {
            const userData = {
                providerData: [{
                    providerId: 'google.com',
                    email: 'user@gmail.com',
                }],
                ...userGetters,
            };
            expect(userData.isGoogleUser()).toBe(true);
        });
        it('should return false when providerId is not google.com', () => {
            const userData = {
                providerData: [{
                    providerId: 'rainbow.com',
                    email: 'user@gmail.com',
                }],
                ...userGetters,
            };
            expect(userData.isGoogleUser()).toBe(false);
        });
    });
    describe('getEmail', () => {
        it('should return the email when exists in userData', () => {
            const userData = {
                email: 'user@gmail.com',
                ...userGetters,
            };
            expect(userData.getEmail()).toBe('user@gmail.com');
        });
        it('should return the provider email when is a facebookUser or a googleUser', () => {
            const userData = {
                providerData: [{
                    providerId: 'facebook.com',
                    email: 'user@gmail.com',
                }],
                ...userGetters,
            };
            expect(userData.getEmail()).toBe('user@gmail.com');
        });
    });
});
