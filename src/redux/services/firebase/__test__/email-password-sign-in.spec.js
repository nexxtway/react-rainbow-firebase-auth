import firebase from '../../../../firebase';
import signInWithEmailAndPassword from '../email-password-sign-in';

jest.mock('../../../../firebase', () => {
    const signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
    const auth = () => ({ signInWithEmailAndPassword });
    return { auth };
});

describe('firebase signInWithEmailAndPassword', () => {
    it('should call signInWithEmailAndPassword with the right arguments', () => {
        expect.assertions(1);
        return signInWithEmailAndPassword('john@gmail.com', '1234')
            .then(() => {
                expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalledWith('john@gmail.com', '1234');
            });
    });
});
