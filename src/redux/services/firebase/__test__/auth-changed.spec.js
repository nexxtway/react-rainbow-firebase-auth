import firebase from '../../../../firebase';
import onAuthStateChanged from '../auth-changed';

jest.mock('./../../../../firebase', () => {
    let fn;
    return {
        auth() {
            return {
                onAuthStateChanged: (callback) => {
                    fn = callback;
                },
            };
        },
        triggerAuthenticationChanged(payload) {
            fn(payload);
        },
    };
});

describe('firebase onAuthStateChanged', () => {
    it('should invoke the callback when the authentication state change', () => {
        const handleAuthChange = jest.fn();
        onAuthStateChanged(handleAuthChange);
        firebase.triggerAuthenticationChanged({ uid: 'cus_123' });
        expect(handleAuthChange).toHaveBeenCalledTimes(1);
        expect(handleAuthChange.mock.calls[0][0]).toEqual({ uid: 'cus_123' });
    });
});
