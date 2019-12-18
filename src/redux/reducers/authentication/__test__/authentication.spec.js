import { fromJS } from 'immutable';
import reducer from '..';

const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
const USER_LOGOUT_DONE = 'USER_LOGOUT_DONE';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_START = 'AUTH_START';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const AUTH_START_WITH_FACEBOOK = 'AUTH_START_WITH_FACEBOOK';
const AUTH_SUCCESS_WITH_FACEBOOK = 'AUTH_SUCCESS_WITH_FACEBOOK';
const AUTH_START_WITH_GOOGLE = 'AUTH_START_WITH_GOOGLE';
const AUTH_SUCCESS_WITH_GOOGLE = 'AUTH_SUCCESS_WITH_GOOGLE';
const AUTH_START_WITH_GITHUB = 'AUTH_START_WITH_GITHUB';
const AUTH_SUCCESS_WITH_GITHUB = 'AUTH_SUCCESS_WITH_GITHUB';
const SHOW_ERROR_MESSAGE = 'SHOW_ERROR_MESSAGE';

describe('authentication reducer', () => {
    describe(`when ${USER_AUTHENTICATED} action`, () => {
        it('should store the user', () => {
            const user = {
                email: 'user@gmail.com',
            };
            const state = reducer(undefined, { type: USER_AUTHENTICATED, user });
            expect(state.toJS().user).toEqual({
                email: 'user@gmail.com',
                getEmail: expect.any(Function),
                isFacebookUser: expect.any(Function),
                isGoogleUser: expect.any(Function),
                isGitHubUser: expect.any(Function),
            });
        });
    });

    describe(`when ${USER_LOGOUT_DONE} action`, () => {
        it('should return the initialState', () => {
            const state = reducer(undefined, { type: USER_LOGOUT_DONE });
            expect(state.toJS()).toEqual({
                authenticationResolved: false,
                isLoading: false,
                user: null,
                isLoadingFacebook: false,
                isLoadingGoogle: false,
                isLoadingGitHub: false,
            });
        });
    });

    describe(`when ${AUTH_SUCCESS} action`, () => {
        it('should set isLoading to false', () => {
            const initialState = fromJS({
                isLoading: true,
            });
            const state = reducer(initialState, { type: AUTH_SUCCESS });
            expect(state.toJS().isLoading).toBe(false);
        });
    });

    describe(`when ${AUTH_START} action`, () => {
        it('should set isLoading to true', () => {
            const initialState = fromJS({
                isLoading: false,
            });
            const state = reducer(initialState, { type: AUTH_START });
            expect(state.toJS().isLoading).toBe(true);
        });
    });

    describe(`when ${UPDATE_USER_DATA} action`, () => {
        it('should update the user data', () => {
            const user = { email: 'user@gmail.com' };
            const data = { displayName: 'user' };
            const initialState = fromJS({ user });
            const state = reducer(initialState, { type: UPDATE_USER_DATA, data });
            expect(state.toJS().user).toEqual({
                displayName: 'user',
                email: 'user@gmail.com',
            });
        });
    });

    describe(`when ${AUTH_START_WITH_FACEBOOK} action`, () => {
        it('should set isLoadingFacebook to true', () => {
            const initialState = fromJS({
                isLoadingFacebook: false,
            });
            const state = reducer(initialState, { type: AUTH_START_WITH_FACEBOOK });
            expect(state.toJS().isLoadingFacebook).toBe(true);
        });
    });

    describe(`when ${AUTH_SUCCESS_WITH_FACEBOOK} action`, () => {
        it('should set isLoadingFacebook to false', () => {
            const initialState = fromJS({
                isLoadingFacebook: true,
            });
            const state = reducer(initialState, { type: AUTH_SUCCESS_WITH_FACEBOOK });
            expect(state.toJS().isLoadingFacebook).toBe(false);
        });
    });

    describe(`when ${AUTH_START_WITH_GOOGLE} action`, () => {
        it('should set isLoadingGoogle to true', () => {
            const initialState = fromJS({
                isLoadingGoogle: false,
            });
            const state = reducer(initialState, { type: AUTH_START_WITH_GOOGLE });
            expect(state.toJS().isLoadingGoogle).toBe(true);
        });
    });

    describe(`when ${AUTH_SUCCESS_WITH_GOOGLE} action`, () => {
        it('should set isLoadingGoogle to false', () => {
            const initialState = fromJS({
                isLoadingGoogle: true,
            });
            const state = reducer(initialState, { type: AUTH_SUCCESS_WITH_GOOGLE });
            expect(state.toJS().isLoadingGoogle).toBe(false);
        });
    });

    describe(`when ${AUTH_START_WITH_GITHUB} action`, () => {
        it('should set isLoadingGitHub to true', () => {
            const initialState = fromJS({
                isLoadingGitHub: false,
            });
            const state = reducer(initialState, { type: AUTH_START_WITH_GITHUB });
            expect(state.toJS().isLoadingGitHub).toBe(true);
        });
    });

    describe(`when ${AUTH_SUCCESS_WITH_GITHUB} action`, () => {
        it('should set isLoadingGitHub to false', () => {
            const initialState = fromJS({
                isLoadingGitHub: true,
            });
            const state = reducer(initialState, { type: AUTH_SUCCESS_WITH_GITHUB });
            expect(state.toJS().isLoadingGitHub).toBe(false);
        });
    });

    describe(`when ${SHOW_ERROR_MESSAGE} action`, () => {
        it('should set isLoading, isLoadingGoogle and isLoadingFacebook to false', () => {
            const initialState = fromJS({
                isLoading: true,
                isLoadingGoogle: true,
                isLoadingFacebook: true,
                isLoadingGitHub: true,
            });
            const state = reducer(initialState, { type: SHOW_ERROR_MESSAGE });
            expect(state.toJS()).toEqual({
                isLoading: false,
                isLoadingGoogle: false,
                isLoadingFacebook: false,
                isLoadingGitHub: false,
            });
        });
    });
});
