import reducer from '../app';

const START_APP_INITIALIZATION = 'START_APP_INITIALIZATION';
const DONE_APP_INITIALIZATION = 'DONE_APP_INITIALIZATION';
const START_APP_LOADING = 'START_APP_LOADING';
const END_APP_LOADING = 'END_APP_LOADING';
const SCREEN_RESIZE = 'SCREEN_RESIZE';

describe('app reducer', () => {
    describe(`when ${START_APP_INITIALIZATION} action`, () => {
        it('should set isInitializing to true', () => {
            const state = reducer(undefined, { type: START_APP_INITIALIZATION });
            expect(state.toJS().isInitializing).toBe(true);
        });
    });

    describe(`when ${DONE_APP_INITIALIZATION} action`, () => {
        it('should set isInitializing to false', () => {
            const state = reducer(undefined, { type: DONE_APP_INITIALIZATION });
            expect(state.toJS().isInitializing).toBe(false);
        });
    });

    describe(`when ${START_APP_LOADING} action`, () => {
        const title = 'Spinner title';
        const message = 'Spinner message';

        it('should set isLoading to true', () => {
            const state = reducer(undefined, { type: START_APP_LOADING, title, message });
            expect(state.toJS().isLoading).toBe(true);
        });

        it('should store the spinner message and title', () => {
            const state = reducer(undefined, { type: START_APP_LOADING, title, message });
            expect(state.toJS().spinnerTitle).toBe('Spinner title');
            expect(state.toJS().spinnerMessage).toBe('Spinner message');
        });
    });

    describe(`when ${END_APP_LOADING} action`, () => {
        it('should set isLoading to false', () => {
            const state = reducer(undefined, { type: END_APP_LOADING });
            expect(state.toJS().isLoading).toBe(false);
        });

        it('should set the spinner message and title to a empty string', () => {
            const state = reducer(undefined, { type: END_APP_LOADING });
            expect(state.toJS().spinnerTitle).toBe('');
            expect(state.toJS().spinnerMessage).toBe('');
        });
    });

    describe(`when ${SCREEN_RESIZE} action`, () => {
        it('should store the screen size as large when it is greater than 990', () => {
            const state = reducer(undefined, { type: SCREEN_RESIZE, screenWidth: 1024 });
            expect(state.toJS().screenWidth).toBe('large');
        });

        it('should store the screen size as medium when it is greater than 600 and less than 990', () => {
            const state = reducer(undefined, { type: SCREEN_RESIZE, screenWidth: 800 });
            expect(state.toJS().screenWidth).toBe('medium');
        });

        it('should store the screen size as small when it is less than 600', () => {
            const state = reducer(undefined, { type: SCREEN_RESIZE, screenWidth: 400 });
            expect(state.toJS().screenWidth).toBe('small');
        });
    });
});
