import listenScreenSizeChange from './screen-size-change';
import handleAuthenticationChange from './handle-auth-change';
import {onAuthStateChanged} from './../../services/firebase';

export default function startApplication() {
    return (dispatch) => {
        dispatch(listenScreenSizeChange());
        onAuthStateChanged((user) => {
            dispatch(handleAuthenticationChange(user));
        });
    };
}
