import firebase from '../../../../firebase';
import sendPasswordResetEmail from '../send-password-reset-email';


jest.mock('../../../../firebase', () => {
    const sendPasswordResetEmail = jest.fn();
    const auth = () => ({ sendPasswordResetEmail });
    return { auth };
});

describe('sendPasswordResetEmail', () => {
    it('should call firebase sendPasswordResetEmail with the email', () => {
        sendPasswordResetEmail('new@email.com');
        expect(firebase.auth().sendPasswordResetEmail).toHaveBeenCalledWith('new@email.com');
    });
});
