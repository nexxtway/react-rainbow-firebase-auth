import getUserIdToken from '../get-user-id-token';
import makeRequest from './make-request';
import processResponse from './process-response';

export default function request(config, authenticated = false) {
    if (authenticated) {
        return getUserIdToken()
            .then(token => makeRequest(config, token))
            .then(processResponse);
    }

    return makeRequest(config)
        .then(processResponse);
}
