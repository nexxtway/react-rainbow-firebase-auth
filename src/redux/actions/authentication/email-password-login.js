import GA from '../../ga';
import handleSignInWithEmailAndPassword from './handle-email-password-sign-in';

export const AUTH_START = 'AUTH_START';
export default function loginWithEmailAndPassword(user) {
    GA.event({
        category: 'User',
        action: 'Login with Email/Password',
        label: user.email,
    });

    return (dispatch) => {
        dispatch({ type: AUTH_START });
        dispatch(handleSignInWithEmailAndPassword(user));
    };
}
