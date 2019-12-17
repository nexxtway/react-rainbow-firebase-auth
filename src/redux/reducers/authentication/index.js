/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    USER_AUTHENTICATED,
    USER_LOGOUT_DONE,
    AUTH_SUCCESS,
    AUTH_START,
    UPDATE_USER_DATA,
    AUTH_START_WITH_FACEBOOK,
    AUTH_SUCCESS_WITH_FACEBOOK,
    AUTH_START_WITH_GITHUB,
    AUTH_SUCCESS_WITH_GITHUB,
    AUTH_START_WITH_GOOGLE,
    AUTH_SUCCESS_WITH_GOOGLE,
} from '../../actions/authentication';
import { SHOW_ERROR_MESSAGE } from '../../actions/app/show-error-message';

import * as userGetters from './user-getters';

const initialState = fromJS({
    authenticationResolved: false,
    isLoading: false,
    user: null,
    isLoadingFacebook: false,
    isLoadingGoogle: false,
    isLoadingGitHub: false,
});

function authenticateUser(state, user) {
    return state.set('user', {
        ...user,
        ...userGetters,
    });
}

function authStart(state) {
    return state.set('isLoading', true);
}

function updateUserData(state, data) {
    const { user } = state.toJS();
    return state.set('user', Object.assign(user, data));
}

function authStartWithFacebook(state) {
    return state.set('isLoadingFacebook', true);
}

function authStartWithGitHub(state) {
    return state.set('isLoadingGitHub', true);
}

function authStartWithGoogle(state) {
    return state.set('isLoadingGoogle', true);
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_AUTHENTICATED:
            return authenticateUser(state, action.user);

        case AUTH_START:
            return authStart(state);

        case SHOW_ERROR_MESSAGE:
            state = state.set('isLoadingFacebook', false);
            state = state.set('isLoadingGoogle', false);
            state = state.set('isLoadingGitHub', false);
            return state.set('isLoading', false);

        case AUTH_SUCCESS:
            return state.set('isLoading', false);

        case USER_LOGOUT_DONE:
            return initialState;

        case UPDATE_USER_DATA:
            return updateUserData(state, action.data);

        case AUTH_START_WITH_FACEBOOK:
            return authStartWithFacebook(state);

        case AUTH_SUCCESS_WITH_FACEBOOK:
            return state.set('isLoadingFacebook', false);

        case AUTH_START_WITH_GITHUB:
            return authStartWithGitHub(state);

        case AUTH_SUCCESS_WITH_GITHUB:
            return state.set('isLoadingGitHub', false);

        case AUTH_START_WITH_GOOGLE:
            return authStartWithGoogle(state);

        case AUTH_SUCCESS_WITH_GOOGLE:
            return state.set('isLoadingGoogle', false);

        default:
            return state;
    }
}
