import history from '../../../history';
import handleAuthenticationChange from './handle-auth-change';
import { onAuthStateChanged } from '../../services/firebase';
import hideMessage from './hide-message';

export default function startApplication() {
    return (dispatch) => {
        onAuthStateChanged((user) => {
            dispatch(handleAuthenticationChange(user));
        });
        history.listen(() => {
            dispatch(hideMessage());
        });
    };
}
