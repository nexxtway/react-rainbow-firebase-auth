import getGitHibUserId from '../get-github-user-id';

describe('getGitHibUserId service', () => {
    it('should return the GitHub user id', () => {
        const user = {
            displayName: 'Pepe',
            email: 'pepe@gmail.com',
            providerData: [
                { uid: 'github_user_123' },
            ],
        };
        expect(getGitHibUserId(user)).toBe('github_user_123');
    });
});
