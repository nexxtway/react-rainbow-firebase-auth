import processResponse from '../process-response';

describe('processResponse', () => {
    it('should resolves object with data and response status when content-type is application/json', () => {
        const response = {
            status: 200,
            headers: {
                get() {
                    return ['application/json'];
                },
            },
            json() {
                return Promise.resolve({
                    name: 'Leo',
                });
            },
        };
        return expect(processResponse(response)).resolves.toEqual({
            status: 200,
            data: { name: 'Leo' },
        });
    });
});
