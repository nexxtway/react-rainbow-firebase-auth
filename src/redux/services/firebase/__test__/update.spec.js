import update from './../update';
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

describe('firebase update', () => {
    it('should update the entry under the ref', () => {
        expect.assertions(1);
        return update('/users/id1', { email: 'doe@gmail.com' })
            .then(() => expect(getOnce('/users/id1'))
                .resolves.toEqual({
                    dispayName: 'John Doe',
                    email: 'doe@gmail.com',
                }));
    });
});
