import firebase from './../../../../firebase';
import createUser from './../create-user';

jest.mock('./../../../../firebase', () => {
    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    const { Mock } = require('firebase-nightlight');
    const mock = new Mock({});
    return mock.initializeApp({});
});
const email = 'pepe@gmail.com';
const password = '1234';

describe('firebase createUser', () => {
    it('should create a new user', () => {
        expect.assertions(1);
        return createUser(email, password)
            .then(() => expect(firebase.auth().currentUser).toEqual(expect.objectContaining({
                email,
            })));
    });
});
