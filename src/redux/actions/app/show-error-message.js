export const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';
export default function showErrorMessage(error) {
    return {
        type: SHOW_ERROR_MESSAGE,
        message: error.message || String(error),
    };
}
