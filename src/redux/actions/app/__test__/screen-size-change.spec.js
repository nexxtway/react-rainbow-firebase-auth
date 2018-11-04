import listenScreenSizeChange from './../screen-size-change';

let handler;
window.addEventListener = (event, handleEvent) => {
    handler = handleEvent;
};

function resizeWindow() {
    handler();
}

describe('listenScreenSizeChange', () => {
    it('should dispatch SCREEN_RESIZE the first time the action is dispatched', () => {
        const dispatch = jest.fn();
        listenScreenSizeChange()(dispatch);
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispatch SCREEN_RESIZE everytime the window gets resized', () => {
        const dispatch = jest.fn();
        listenScreenSizeChange()(dispatch);
        dispatch.mockReset();
        resizeWindow();
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should dispacth SCREEN_RESIZE with the screenSize value', () => {
        const dispatch = jest.fn();
        listenScreenSizeChange()(dispatch);
        dispatch.mockReset();
        window.innerWidth = 500;
        resizeWindow();
        expect(dispatch).toHaveBeenCalledWith({
            type: 'SCREEN_RESIZE',
            screenWidth: 500,
        });
    });
});
