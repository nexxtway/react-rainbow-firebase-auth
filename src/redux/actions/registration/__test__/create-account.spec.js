import createAccount from '../create-account';
import createUser from '../../../services/firebase/create-user';
import updateProfile from '../../../services/firebase/update-profile';
import showErrorMessage from '../../app/show-error-message';
import updateUserData from '../../authentication/update-user-data';

jest.mock('../../../services/app/get-current-locale', () => jest.fn(() => 'en'));
jest.mock('../../../services/firebase/create-user', () => jest.fn(() => Promise.resolve({
    email: 'leo@gmail.com',
    uid: 'user_60',
})));
jest.mock('../../../services/firebase/update-profile', () => jest.fn());
jest.mock('../../app/show-error-message', () => jest.fn());
jest.mock('../../authentication/update-user-data', () => jest.fn());

const user = {
    name: 'Leo',
    email: 'leo@gmail.com',
    password: '1234',
};

describe('createAccount action', () => {
    it('should dispatch CREATE_ACCOUNT_LOADING', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        return createAccount(user)(dispatch)
            .then(() => expect(dispatch.mock.calls[0][0]).toEqual({ type: 'CREATE_ACCOUNT_LOADING' }));
    });
    it('should call createUser with the user email and password', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        createUser.mockReset();
        createUser.mockReturnValue(Promise.resolve());
        return createAccount(user)(dispatch)
            .then(() => expect(createUser).toHaveBeenCalledWith(user.email, user.password));
    });
    it('should call updateProfile with the right data', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        updateProfile.mockReset();
        return createAccount(user)(dispatch)
            .then(() => expect(updateProfile).toHaveBeenCalledWith({
                displayName: 'Leo',
            }));
    });
    it('should dispatch updateUserData and CREATE_ACCOUNT_SUCCESS', () => {
        expect.assertions(3);
        const dispatch = jest.fn();
        return createAccount(user)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(3);
                expect(updateUserData).toHaveBeenCalledWith({
                    displayName: 'Leo',
                });
                expect(dispatch.mock.calls[2][0]).toEqual({ type: 'CREATE_ACCOUNT_SUCCESS' });
            });
    });
    it('should dispatch showErrorMessage with the error received when createUser reject', () => {
        const ERROR = 'registration error';
        expect.assertions(2);
        const dispatch = jest.fn();
        createUser.mockReset();
        createUser.mockReturnValue(Promise.reject(ERROR));
        return createAccount(user)(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledTimes(2);
                expect(showErrorMessage).toHaveBeenCalledWith(ERROR);
            });
    });
});
