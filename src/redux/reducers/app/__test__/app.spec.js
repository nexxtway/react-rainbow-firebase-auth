import { fromJS } from 'immutable';
import reducer from '..';

const START_APP_INITIALIZATION = 'START_APP_INITIALIZATION';
const DONE_APP_INITIALIZATION = 'DONE_APP_INITIALIZATION';
const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';
const SHOW_SUCCESS_MESSAGE = 'SHOW_SUCCESS_MESSAGE';
const HIDE_MESSAGE = 'HIDE_MESSAGE';
const USER_LOGOUT_DONE = 'USER_LOGOUT_DONE';

describe('app reducer', () => {
    describe(`when ${START_APP_INITIALIZATION} action`, () => {
        it('should set isInitializing to true', () => {
            const initialState = fromJS({
                isInitializing: false,
            });
            const state = reducer(initialState, { type: START_APP_INITIALIZATION });
            expect(state.toJS().isInitializing).toBe(true);
        });
    });

    describe(`when ${DONE_APP_INITIALIZATION} action`, () => {
        it('should set isInitializing to false', () => {
            const initialState = fromJS({
                isInitializing: true,
            });
            const state = reducer(initialState, { type: DONE_APP_INITIALIZATION });
            expect(state.toJS().isInitializing).toBe(false);
        });
    });

    describe(`when ${SHOW_ERROR_MESSAGE} action`, () => {
        it('should set the errorMessage passed', () => {
            const state = reducer(undefined, { type: SHOW_ERROR_MESSAGE, message: 'Error message' });
            expect(state.toJS()).toEqual({
                isInitializing: true,
                isLoading: false,
                message: 'Error message',
                messageVariant: 'error',
            });
        });
    });

    describe(`when ${SHOW_SUCCESS_MESSAGE} action`, () => {
        it('should set the errorMessage passed', () => {
            const state = reducer(undefined, { type: SHOW_SUCCESS_MESSAGE, message: 'Success message' });
            expect(state.toJS()).toEqual({
                isInitializing: true,
                isLoading: false,
                message: 'Success message',
                messageVariant: 'success',
            });
        });
    });

    describe(`when ${HIDE_MESSAGE} action`, () => {
        it('should set the errorMessage to undefined', () => {
            const initialState = fromJS({
                message: 'Error message',
                messageVariant: 'error',
            });
            const state = reducer(initialState, { type: HIDE_MESSAGE });
            expect(state.toJS()).toEqual({
                message: undefined,
                messageVariant: undefined,
            });
        });
    });

    describe(`when ${USER_LOGOUT_DONE} action`, () => {
        it('should return the initialState', () => {
            const state = reducer(undefined, { type: USER_LOGOUT_DONE });
            expect(state.toJS()).toEqual({
                isInitializing: true,
                isLoading: false,
                message: undefined,
                messageVariant: undefined,
            });
        });
    });
});
