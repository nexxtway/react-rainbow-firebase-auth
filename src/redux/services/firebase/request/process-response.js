export default function processResponse(response) {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json()
            .then(data => ({
                status: response.status,
                data,
            }));
    }
    return response;
}
