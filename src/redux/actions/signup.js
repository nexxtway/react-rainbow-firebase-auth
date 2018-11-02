import signup from './../services/signup';
import showErrorMessage from './show-error-message';
import redirectToVerificationFlow from '../services/redirect-to-verification-flow';

export default function signupAction(values) {
    return (dispatch) => {
        const { username } = values;
        signup(values)
            .then(() => {
                redirectToVerificationFlow(username);
            })
            .catch((error) => {
                dispatch(showErrorMessage(error));
            });
    }
}
