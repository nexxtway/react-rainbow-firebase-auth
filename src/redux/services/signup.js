import { Auth } from 'aws-amplify';

export default function signup({ username, password, email }) {
    return Auth.signUp({
        username,
        password,
        attributes: {
            email,
        },
    });
}
