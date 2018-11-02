import { Cache } from 'aws-amplify';
import history from './../../history';

export default function redirectToVerificationFlow(username) {
    const in10Min = Date.now() + 5 * 60 * 1000;
    Cache.setItem('pendingVerificationUser', {
        username,
    }, { expires: in10Min });
    history.push('/home/verification');
}
