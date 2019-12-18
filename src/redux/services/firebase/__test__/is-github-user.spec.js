import isGitHubUser from '../is-github-user';

describe('isGitHubUser service', () => {
    it('should return false if the user passed is not from GitHub', () => {
        const user = {
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
        };
        expect(isGitHubUser(user)).toBe(false);
    });
    it('should return true if the user passed is from GitHub', () => {
        const user = {
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
            providerData: [
                { providerId: 'github.com' },
            ],
        };
        expect(isGitHubUser(user)).toBe(true);
    });
});
