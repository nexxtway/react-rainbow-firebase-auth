export const SCREEN_RESIZE = 'SCREEN_RESIZE';
function screenResize() {
    return {
        type: SCREEN_RESIZE,
        screenWidth: window.innerWidth,
    };
}

export default function listenScreenSizeChange() {
    return (dispatch) => {
        window.addEventListener('resize', () => dispatch(screenResize()));
        dispatch(screenResize());
    };
}
