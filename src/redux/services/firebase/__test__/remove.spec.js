import remove from './../remove';
import getOnce from './../get-once';

jest.mock('./../../../../firebase', () => {
    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    const { Mock } = require('firebase-nightlight');
    const mock = new Mock({
        database: {
            content: {
                users: {
                    id1: {
                        dispayName: 'John Doe',
                        email: 'john@gmail.com',
                    },
                },
            },
        },
    });
    return mock.initializeApp({});
});

describe('firebase remove', () => {
    it('should remove the entry under the ref', () => {
        expect.assertions(1);
        return remove('/users/id1')
            .then(() => expect(getOnce('/users/id1')).resolves.toBeNull());
    });
});
