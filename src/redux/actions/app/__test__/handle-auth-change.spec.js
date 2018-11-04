import handleAuthenticationChange from '../handle-auth-change';
import saveUserLocaleInDb from '../../../services/users/save-user-locale';

jest.mock('./../../../services/users/save-user-locale', () => jest.fn());

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

    it('should dispatch DONE_APP_INITIALIZATION if handleAuthenticationChange is called without user', () => {
        const dispatch = jest.fn();
        handleAuthenticationChange()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
            type: 'DONE_APP_INITIALIZATION',
        });
    });
});
