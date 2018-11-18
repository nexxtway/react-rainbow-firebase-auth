import { fromJS } from 'immutable';
import reducer from '..';

const CREATE_ACCOUNT_LOADING = 'CREATE_ACCOUNT_LOADING';
const CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS';
const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

describe('registration reducer', () => {
    describe(`when ${CREATE_ACCOUNT_LOADING} action`, () => {
        it('should set isLoading to true', () => {
            const initialState = fromJS({
                isLoading: false,
            });
            const state = reducer(initialState, { type: CREATE_ACCOUNT_LOADING });
            expect(state.toJS()).toBe(true);
        });
    });

    describe(`when ${CREATE_ACCOUNT_SUCCESS} action`, () => {
        it('should set isLoading to false', () => {
            const initialState = fromJS({
                isLoading: true,
            });
            const state = reducer(initialState, { type: CREATE_ACCOUNT_SUCCESS });
            expect(state.toJS()).toEqual({
                isLoading: false,
            });
        });
    });

    describe(`when ${SHOW_ERROR_MESSAGE} action`, () => {
        it('should set isLoading to false', () => {
            const initialState = fromJS({
                isLoading: true,
            });
            const state = reducer(initialState, { type: SHOW_ERROR_MESSAGE });
            expect(state.toJS()).toEqual({
                isLoading: false,
            });
        });
    });
});
