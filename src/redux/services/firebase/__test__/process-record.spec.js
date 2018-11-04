import processRecord from './../process-record';

describe('onChilAdded service', () => {
    it('should not call the callback if the record does not exists', () => {
        const callback = jest.fn();
        const snapshot = {
            exists() {
                return false;
            },
        };
        processRecord(snapshot, callback);
        expect(callback).not.toHaveBeenCalled();
    });
    it('should call the callback with the right arguments when the record exists', () => {
        const callback = jest.fn();
        const snapshot = {
            exists() {
                return true;
            },
            val() {
                return { name: 'Leandro Torres' };
            },
            key: '1234',
        };
        processRecord(snapshot, callback);
        expect(callback).toHaveBeenCalledWith({
            id: '1234',
            name: 'Leandro Torres',
        });
    });
    it('should call the callback with the value passed as key instead of id when the record exists', () => {
        const callback = jest.fn();
        const snapshot = {
            exists() {
                return true;
            },
            val() {
                return { name: 'Leandro Torres' };
            },
            key: '1234',
        };
        processRecord(snapshot, callback, 'userId');
        expect(callback).toHaveBeenCalledWith({
            userId: '1234',
            name: 'Leandro Torres',
        });
    });
});
