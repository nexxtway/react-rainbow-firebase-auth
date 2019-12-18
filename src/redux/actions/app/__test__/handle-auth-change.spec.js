import handleAuthenticationChange from '../handle-auth-change';

const user = {
    displayName: 'Pepe',
    uid: '1234qwerty',
    photoURL: null,
};

describe('handleAuthenticationChange', () => {
    it('should dispatch START_APP_INITIALIZATION', () => {
        const dispatch = jest.fn();
        handleAuthenticationChange(user)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({
            type: 'START_APP_INITIALIZATION',
        });
    });

    it('should dispatch USER_AUTHENTICATED and DONE_APP_INITIALIZATION', () => {
        expect.assertions(2);
        const dispatch = jest.fn();
        handleAuthenticationChange(user)(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
            type: 'USER_AUTHENTICATED',
            user,
        });
        expect(dispatch.mock.calls[2][0]).toEqual({
            type: 'DONE_APP_INITIALIZATION',
        });
    });

    it('should dispatch DONE_APP_INITIALIZATION if handleAuthenticationChange is called without user', () => {
        const dispatch = jest.fn();
        handleAuthenticationChange()(dispatch);
        expect(dispatch).toHaveBeenCalledWith({
            type: 'DONE_APP_INITIALIZATION',
        });
    });
});
