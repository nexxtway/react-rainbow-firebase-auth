import reauthenticateUserService from '../../services/firebase/reauthenticate-user';

export default function reauthenticateUser(credentials) {
    return reauthenticateUserService(credentials);
}
