import request from '..';
import getUserIdToken from '../../get-user-id-token';
import makeRequest from '../make-request';
import processResponse from '../process-response';

jest.mock('./../../get-user-id-token', () => jest.fn(() => Promise.resolve('1234qwerty')));
jest.mock('./../make-request', () => jest.fn(() => Promise.resolve({
    status: 200,
    data: {
        name: 'Leo',
    },
})));
jest.mock('./../process-response', () => jest.fn(() => Promise.resolve()));

const config = {
    url: 'database/users/user_1',
    method: 'GET',
};

describe('firebase request', () => {
    it('should call getUserIdToken and makeRequest with the token when the request is authenticated', () => {
        expect.assertions(3);
        return request(config, true)
            .then(() => {
                expect(getUserIdToken).toHaveBeenCalledTimes(1);
                expect(makeRequest).toHaveBeenCalledWith(config, '1234qwerty');
                expect(processResponse).toHaveBeenCalledWith({
                    status: 200,
                    data: {
                        name: 'Leo',
                    },
                });
            });
    });
    it('should not call getUserIdToken when the request is not authenticated', () => {
        expect.assertions(3);
        getUserIdToken.mockReset();
        makeRequest.mockReset();
        processResponse.mockReset();
        makeRequest.mockReturnValue(Promise.resolve({
            status: 200,
            data: {
                name: 'Leo',
            },
        }));
        return request(config, false)
            .then(() => {
                expect(getUserIdToken).not.toHaveBeenCalled();
                expect(makeRequest).toHaveBeenCalledWith(config);
                expect(processResponse).toHaveBeenCalledWith({
                    status: 200,
                    data: {
                        name: 'Leo',
                    },
                });
            });
    });
});
