export const START_APP_LOADING = 'START_APP_LOADING';
export function startAppLoading(title, message) {
    return {
        type: START_APP_LOADING,
        title,
        message,
    };
}
