import push from '../push';
import getOnce from '../get-once';

jest.mock('./../../../../firebase', () => {
    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    const { Mock } = require('firebase-nightlight');
    const mock = new Mock({
        database: {
            content: {
                users: {
                },
            },
        },
    });
    return mock.initializeApp({});
});

describe('firebase push', () => {
    it('should resolve the key of the new entry under the ref', () => {
        expect.assertions(1);
        return push('/users', { name: 'Reinier' })
            .then(key => expect(getOnce(`/users/${key}`))
                .resolves.toEqual({ name: 'Reinier' }));
    });
});
