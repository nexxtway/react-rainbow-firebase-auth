import signout from './../services/signout';
import { unauthenticate }   from './unauthenticate';

export default function logout() {
    return (dispatch) => {
        signout()
            .then(() => {
                dispatch(unauthenticate());
            });
    }
}
