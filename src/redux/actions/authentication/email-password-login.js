import handleSignInWithEmailAndPassword from './handle-email-password-sign-in';

export const AUTH_START = 'AUTH_START';
export default function loginWithEmailAndPassword(user) {
    return (dispatch) => {
        dispatch({ type: AUTH_START });
        dispatch(handleSignInWithEmailAndPassword(user));
    };
}
