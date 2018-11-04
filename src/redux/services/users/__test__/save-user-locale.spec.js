import saveUserLocale from './../save-user-locale';
import { update, getCurrentUser } from './../../firebase';

jest.mock('./../../firebase/get-current-user', () => jest.fn());
jest.mock('./../../firebase/update', () => jest.fn(() => Promise.resolve()));

describe('saveUserLocale service', () => {
    it('should call update with the right arguments if there is an user authenticated', () => {
        expect.assertions(1);
        getCurrentUser.mockReset();
        getCurrentUser.mockReturnValue({
            displayName: 'John Doe',
            email: 'johndoe@gmail.com',
            uid: 'user1',
        });
        return saveUserLocale('en').then(() => {
            expect(update).toHaveBeenCalledWith('/users/user1/i18n', { locale: 'en' });
        });
    });
    it('should resolve the promise undefined when there is not user authenticated', () => {
        expect.assertions(1);
        update.mockReset();
        getCurrentUser.mockReset();
        getCurrentUser.mockReturnValue(null);
        return expect(saveUserLocale('en')).resolves.toBe();
    });
});
