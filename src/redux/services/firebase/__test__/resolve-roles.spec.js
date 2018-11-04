import resolveUserRoles from '../resolve-roles';
import getOnce from '../get-once';

jest.mock('./../../firebase/get-current-user', () => jest.fn(() => ({
    uid: 'user_10',
})));
jest.mock('./../../firebase/get-once', () => jest.fn(() => Promise.resolve()));
const roles = {
    reseller: true,
    admin: true,
};

describe('resolveUserRoles service', () => {
    it('should call getOnce with /users/user_10', () => {
        expect.assertions(1);
        getOnce.mockReturnValue(Promise.resolve({ roles }));
        return resolveUserRoles()
            .then(() => expect(getOnce).toHaveBeenCalledWith('/users/user_10'));
    });
    it('should resolve the user roles if exists', () => {
        expect.assertions(1);
        getOnce.mockReturnValue(Promise.resolve({ roles }));
        return expect(resolveUserRoles()).resolves.toEqual(roles);
    });
    it('should resolve null when the user does not have roles', () => {
        expect.assertions(1);
        expect.assertions(1);
        getOnce.mockReturnValue(Promise.resolve({ roles: undefined }));
        return expect(resolveUserRoles()).resolves.toEqual(null);
    });
});
