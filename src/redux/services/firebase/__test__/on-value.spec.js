import onValue from './../on-value';
import update from './../update';

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

describe('firebase onValue', () => {
    it('should resolve the user updated at the ref passed', (done) => {
        const ref = '/user';
        const callback = jest.fn((data) => {
            expect(data).toEqual({
                name: 'Leo',
                age: 25,
            });
            done();
        });
        onValue(ref, callback);
        update(ref, { name: 'Leo' });
    });
});
