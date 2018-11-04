import resolveInitialData from '../resolve-initial-data';

jest.mock('./../../options/resolve', () => jest.fn(() => Promise.resolve({
    cubacel: [],
    nauta: [],
})));
jest.mock('./../../firebase/resolve-roles', () => jest.fn(() => Promise.resolve({ reseller: true })));
jest.mock('./../../topups/resolve-previous', () => jest.fn(() => Promise.resolve([])));
jest.mock('./../../users/resolve-user-phone', () => jest.fn(() => Promise.resolve('12121212')));


describe('resolveInitialData service', () => {
    it('should resolve the initial data', () => {
        expect.assertions(1);
        return expect(resolveInitialData()).resolves.toEqual({
            baseOptions: {
                cubacel: [],
                nauta: [],
            },
            roles: {
                reseller: true,
            },
            topups: [],
            phoneNumber: '12121212',
        });
    });
});
