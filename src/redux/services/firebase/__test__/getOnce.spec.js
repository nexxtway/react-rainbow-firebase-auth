import getOnce from '../get-once';

jest.mock('./../../../../firebase', () => {
    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    const { Mock } = require('firebase-nightlight');
    const mock = new Mock({
        database: {
            content: {
                user: {
                    name: 'Leandro Torres',
                    age: 25,
                },
            },
        },
    });
    return mock.initializeApp({});
});

describe('firebase getOnce', () => {
    it('should resolve the ref value', () => {
        expect.assertions(1);
        const ref = '/user';
        return expect(getOnce(ref))
            .resolves.toEqual({
                name: 'Leandro Torres',
                age: 25,
            });
    });
    it('should resolve null when the ref does not exists', () => {
        expect.assertions(1);
        const wrongRef = '/wrong';
        return expect(getOnce(wrongRef)).resolves.toBeNull();
    });
});
