import showErrorMessage from '../show-error-message';
import { resolveError } from '../../../services/firebase/resolve-errors';

jest.mock('../../../services/firebase/resolve-errors', () => ({
    resolveError: jest.fn(error => error),
}));

describe('showErrorMessage', () => {
    it('should call resolveError', () => {
        showErrorMessage('error');
        expect(resolveError).toHaveBeenCalledWith('error');
    });

    it('should return an object with type SHOW_ERROR_MESSAGE and message "error"', () => {
        const action = showErrorMessage('error');
        expect(action).toEqual({
            type: 'SHOW_ERROR_MESSAGE',
            message: 'error',
        });
    });
});
