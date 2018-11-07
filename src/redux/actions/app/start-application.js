import handleAuthenticationChange from './handle-auth-change';
import { onAuthStateChanged } from '../../services/firebase';

export default function startApplication() {
    return (dispatch) => {
        onAuthStateChanged((user) => {
            dispatch(handleAuthenticationChange(user));
        });
    };
}
