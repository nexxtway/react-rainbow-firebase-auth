import createAccount from '../create-account';
import createUser from '../../../services/firebase/create-user';
import updateUser from '../../../services/registration/update-user';

jest.mock('./../../../services/app/get-current-locale', () => jest.fn(() => 'en'));
jest.mock('./../../../services/firebase/create-user', () => jest.fn(() => Promise.resolve({
    email: 'leo@gmail.com',
    uid: 'user_60',
})));
jest.mock('./../../../services/registration/update-user', () => jest.fn());
const user = {
    name: 'Leo',
    email: 'leo@gmail.com',
    password: '1234',
};
const createdUser = {
    email: 'leo@gmail.com',
    uid: 'user_60',
};

describe('createAccount action', () => {
    it('should dispatch CREATE_ACCOUNT_LOADING', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return createAccount(user)(dispatch, getState)
            .then(() => expect(dispatch.mock.calls[0][0]).toEqual({ type: 'CREATE_ACCOUNT_LOADING' }));
    });
    it('should call createUser with the user email and password', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        createUser.mockReset();
        createUser.mockReturnValue(Promise.resolve(createdUser));
        return createAccount(user)(dispatch, getState)
            .then(() => expect(createUser).toHaveBeenCalledWith(user.email, user.password));
    });
    it('should call updateUser with the created user and the user profile data', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        updateUser.mockReset();
        return createAccount(user)(dispatch, getState)
            .then(() => expect(updateUser).toHaveBeenCalledWith(createdUser, {
                displayName: 'Leo',
                i18n: { locale: 'en' },
            }));
    });
    it('should dispatch CREATE_ACCOUNT_SUCCESS', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        return createAccount(user)(dispatch, getState)
            .then(() => expect(dispatch.mock.calls[1][0]).toEqual({ type: 'CREATE_ACCOUNT_SUCCESS' }));
    });
    it('should dispatch CREATE_ACCOUNT_ERROR with the error received when createUser reject', () => {
        const ERROR = 'registration error';
        expect.assertions(1);
        const dispatch = jest.fn();
        const getState = jest.fn();
        createUser.mockReset();
        createUser.mockReturnValue(Promise.reject(ERROR));
        return createAccount(user)(dispatch, getState)
            .then(() => expect(dispatch.mock.calls[1][0]).toEqual({
                type: 'CREATE_ACCOUNT_ERROR',
                error: 'registration error',
            }));
    });
});
