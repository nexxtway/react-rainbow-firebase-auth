import { fromJS } from 'immutable';
import reducer from '..';

const RESET_EMAIL_SENT = 'RESET_EMAIL_SENT';
const SEND_PASS_RESET_EMAIL = 'SEND_PASS_RESET_EMAIL';
const RESET_FORGOT_PASSWORD = 'RESET_FORGOT_PASSWORD';
const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

describe('forgotPassword reducer', () => {
    describe(`when ${RESET_EMAIL_SENT} action`, () => {
        it('should set isLoading to false and isEmailSent to true', () => {
            const initialState = fromJS({
                isLoading: true,
                isEmailSent: false,
            });
            const state = reducer(initialState, { type: RESET_EMAIL_SENT });
            expect(state.toJS()).toEqual({
                isLoading: false,
                isEmailSent: true,
            });
        });
    });

    describe(`when ${SEND_PASS_RESET_EMAIL} action`, () => {
        it('should set isLoading to true and store the email passed', () => {
            const initialState = fromJS({
                isLoading: false,
            });
            const state = reducer(initialState, { type: SEND_PASS_RESET_EMAIL, email: 'Email' });
            expect(state.toJS()).toEqual({
                email: 'Email',
                isLoading: true,
            });
        });
    });

    describe(`when ${RESET_FORGOT_PASSWORD} action`, () => {
        it('should return the initialState', () => {
            const state = reducer(undefined, { type: RESET_FORGOT_PASSWORD });
            expect(state.toJS()).toEqual({
                isLoading: false,
                isEmailSent: false,
            });
        });
    });

    describe(`when ${SHOW_ERROR_MESSAGE} action`, () => {
        it('should set isLoading to false', () => {
            const initialState = fromJS({
                isLoading: true,
            });
            const state = reducer(initialState, { type: SHOW_ERROR_MESSAGE });
            expect(state.toJS().isLoading).toBe(false);
        });
    });
});
