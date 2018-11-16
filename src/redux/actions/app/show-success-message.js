
export const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE';
export default function showSuccessMessage(message) {
    return {
        type: SHOW_SUCCESS_MESSAGE,
        message,
    };
}
