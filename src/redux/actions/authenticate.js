export const AUTHENTICATE_USER = 'AUTHENTICATE_USER';
export function authenticate(user) {
    return {
        type: AUTHENTICATE_USER,
        user,
    }
}
