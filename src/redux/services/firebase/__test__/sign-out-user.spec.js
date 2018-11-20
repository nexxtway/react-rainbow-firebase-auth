import signOutUser from '../sign-out-user';
import firebase from '../../../../firebase';

jest.mock('../../../../firebase', () => {
    const signOut = jest.fn(() => Promise.resolve());
    const auth = () => ({ signOut });
    return { auth };
});

describe('firebase signOutUser', () => {
    it('should call signOut', () => {
        expect.assertions(1);
        return signOutUser()
            .then(() => {
                expect(firebase.auth().signOut).toHaveBeenCalled();
            });
    });
});
