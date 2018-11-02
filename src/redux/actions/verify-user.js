import confirmUser from './../services/confirm-user';
import history from './../../history';

export default function verifyUser(values) {
    return (dispatch) => {
        confirmUser(values)
            .then(() => {
                history.replace('/home/signin');
            })
            .catch((error) => {
                alert(error.message);
            })
    }
}
