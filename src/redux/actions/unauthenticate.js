export const UNAUTHENTICATE_USER = 'UNAUTHENTICATE_USER';

export function unauthenticate() {
    return {
        type: UNAUTHENTICATE_USER,
    }
}
