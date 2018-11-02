import signin from './../services/signin';
import { authenticate } from './authenticate';
import showErrorMessage from './show-error-message';
import redirectToVerificationFlow from '../services/redirect-to-verification-flow';

export default function login(user) {
    return (dispatch) => {
        signin(user)
            .then((user) => {
                dispatch(authenticate(user))
            })
            .catch((error) => {
                if (error.code === 'UserNotConfirmedException') {
                    redirectToVerificationFlow(user.username);
                } else {
                    dispatch(showErrorMessage(error));
                }
            })
    }
}
