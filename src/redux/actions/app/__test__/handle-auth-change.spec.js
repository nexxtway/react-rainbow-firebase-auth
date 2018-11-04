import handleAuthenticationChange from '../handle-auth-change';
import saveUserLocaleInDb from '../../services/users/save-user-locale';
import resolveInitialData from '../../services/app/resolve-initial-data';
import initializeStores from '../initialize-stores';

jest.mock('./../../services/users/save-user-locale', () => jest.fn());
jest.mock('./../../services/app/resolve-initial-data', () => jest.fn(() => Promise.resolve({
    baseOptions: { price: 20 },
    topups: [],
})));
jest.mock('./../initialize-stores', () => jest.fn(() => Promise.resolve()));
const getState = () => ({
    i18n: {
        locale: 'en',
    },
});
const user = {
    displayName: 'Pepe',
    uid: '1234qwerty',
};
jest.useFakeTimers();

describe('handleAuthenticationChange', () => {
    it('should call saveUserLocaleInDb with the locale', () => {
        const dispatch = jest.fn();
        handleAuthenticationChange(user)(dispatch, getState);
        expect(saveUserLocaleInDb).toHaveBeenCalledWith('en');
    });

    it('should dispatch START_APP_INITIALIZATION', () => {
        const dispatch = jest.fn();
        handleAuthenticationChange(user)(dispatch, getState);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: 'START_APP_INITIALIZATION',
        });
    });

    it('should dispatch USER_AUTHENTICATED', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        handleAuthenticationChange(user)(dispatch, getState);
        setTimeout(() => {
            expect(dispatch.mock.calls[1][0]).toEqual({
                type: 'USER_AUTHENTICATED',
                user: {
                    displayName: 'Pepe',
                    uid: '1234qwerty',
                },
            });
        }, 0);
        jest.runAllTimers();
    });

    it('should call resolveInitialData', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        resolveInitialData.mockReset();
        resolveInitialData.mockReturnValue(Promise.resolve());
        handleAuthenticationChange(user)(dispatch, getState);
        setTimeout(() => expect(resolveInitialData).toHaveBeenCalledTimes(1), 0);
        jest.runAllTimers();
    });

    it('should dispatch initializeStores with the right data', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        handleAuthenticationChange(user)(dispatch, getState);
        setTimeout(() => resolveInitialData()
            .then(() => {
                expect(initializeStores).toHaveBeenCalledWith({
                    baseOptions: { price: 20 },
                    topups: [],
                });
            }), 0);
        jest.runAllTimers();
    });

    it('should dispatch DONE_APP_INITIALIZATION if handleAuthenticationChange is called without user', () => {
        const dispatch = jest.fn();
        handleAuthenticationChange()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
            type: 'DONE_APP_INITIALIZATION',
        });
    });
});
