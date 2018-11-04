import set from './../update';
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
    it('should set the entry under the ref', () => {
        expect.assertions(1);
        return set('/transanction/id1', { price: 10.5 })
            .then(() => expect(getOnce('/transanction/id1'))
                .resolves.toEqual({
                    price: 10.5,
                }));
    });
    it('should override a ref data', () => {
        expect.assertions(1);
        return set('/user/id1', { email: 'reiniergs@gmail.com' })
            .then(() => expect(getOnce('/user/id1'))
                .resolves.toEqual({
                    email: 'reiniergs@gmail.com',
                }));
    });
});
