
export const OPEN_CHANGE_NAME_MODAL = 'OPEN_CHANGE_NAME_MODAL';
export default function openChangeNameModal() {
    return (dispatch, getState) => {
        const state = getState();
        const displayName = state.authentication.get('user').displayName;
        dispatch({
            type: OPEN_CHANGE_NAME_MODAL,
            displayName,
        });
    };
}
