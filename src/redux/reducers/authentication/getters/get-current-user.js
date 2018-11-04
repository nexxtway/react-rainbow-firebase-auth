export default function getCurrentUser(state) {
    return state.authentication.get('user');
}
