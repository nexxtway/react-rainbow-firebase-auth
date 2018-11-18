import firebase from '../../../../firebase';
import createUser from '../create-user';

jest.mock('../../../../firebase', () => {
    const createUserWithEmailAndPassword = jest.fn(() => Promise.resolve());
    const auth = () => ({ createUserWithEmailAndPassword });
    return { auth };
});
const email = 'pepe@gmail.com';
const password = '1234';

describe('createUser', () => {
    it('should create a new user', () => {
        expect.assertions(1);
        return createUser(email, password)
            .then(() => {
                expect(firebase.auth().createUserWithEmailAndPassword)
                    .toHaveBeenCalledWith(email, password);
            });
    });
});
