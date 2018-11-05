export default function makeRequest(config, token) {
    const { url, method, data } = config;
    const headers = new Headers();

    if (token) {
        headers.append('authorization', `Bearer ${token}`);
    }

    headers.append('Content-Type', 'application/json');
    return fetch(url, {
        method,
        body: JSON.stringify(data),
        headers,
    });
}
