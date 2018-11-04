import logoutUser from '../logout-user';
import signOutUser from '../../services/firebase/sign-out-user';

jest.mock('./../../services/firebase/sign-out-user', () => jest.fn(() => Promise.resolve()));

describe('logoutUser', () => {
    it('should call signOutUser', () => {
        const dispatch = jest.fn();
        return logoutUser()(dispatch)
            .then(() => {
                expect(signOutUser).toHaveBeenCalledTimes(1);
            });
    });

    it('should dispatch USER_LOGOUT_DONE', () => {
        expect.assertions(1);
        const dispatch = jest.fn();
        return logoutUser()(dispatch)
            .then(() => {
                expect(dispatch).toHaveBeenCalledWith({ type: 'USER_LOGOUT_DONE' });
            });
    });
});
