import { fromJS } from 'immutable';
import reducer from '..';

const UPDATE_PROFILE_START = 'UPDATE_PROFILE_START';
const UPDATE_PROFILE_END = 'UPDATE_PROFILE_END';
const USER_LOGOUT_DONE = 'USER_LOGOUT_DONE';

describe('profile reducer', () => {
    describe(`when ${UPDATE_PROFILE_START} action`, () => {
        it('should set isLoading to true', () => {
            const initialState = fromJS({
                isLoading: false,
            });
            const state = reducer(initialState, { type: UPDATE_PROFILE_START });
            expect(state.toJS().isLoading).toBe(true);
        });
    });

    describe(`when ${UPDATE_PROFILE_END} action`, () => {
        it('should set isLoading to false', () => {
            const initialState = fromJS({
                isLoading: true,
            });
            const state = reducer(initialState, { type: UPDATE_PROFILE_END });
            expect(state.toJS().isLoading).toBe(false);
        });
    });

    describe(`when ${USER_LOGOUT_DONE} action`, () => {
        it('should return the initialState', () => {
            const state = reducer(undefined, { type: USER_LOGOUT_DONE });
            expect(state.toJS().isLoading).toBe(false);
        });
    });
});
