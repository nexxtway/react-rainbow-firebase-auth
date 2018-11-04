/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    USER_AUTHENTICATED,
    USER_LOGOUT_DONE,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_START,
    AUTH_RESET_FORM,
    UPDATE_USER_DATA,
    AUTH_START_WITH_FACEBOOK,
    AUTH_SUCCESS_WITH_FACEBOOK,
    AUTH_ERROR_WITH_FACEBOOK,
} from './../../actions/authentication';
import { NAME_CHANGED } from './../../actions/change-name-modal/change-name';

import * as userGetters from './user-getters';

const initialState = fromJS({
    authenticationResolved: false,
    isLoading: false,
    errorMessage: '',
    user: null,
    isLoadingFacebook: false,
    facebookErrorMessage: '',
});

function authenticateUser(state, user) {
    return state.set('user', {
        ...user,
        ...userGetters,
    });
}

function authStart(state) {
    state = state.set('errorMessage', '');
    return state.set('isLoading', true);
}

function authError(state, error) {
    state = state.set('isLoading', false);
    return state.set('errorMessage', error);
}

function updateUserData(state, data) {
    const user = state.get('user');
    return state.set('user', Object.assign(user, data));
}

function logoutUser(state) {
    return state.set('user', null);
}

function authStartWithFacebook(state) {
    state = state.set('facebookErrorMessage', '');
    return state.set('isLoadingFacebook', true);
}

function authErrorWithFacebook(state, error) {
    state = state.set('isLoadingFacebook', false);
    return state.set('facebookErrorMessage', error);
}

function nameChanged(state, { displayName }) {
    const user = state.get('user');
    return state.set('user', {
        ...user,
        displayName,
    });
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_AUTHENTICATED:
            return authenticateUser(state, action.user);

        case AUTH_START:
            return authStart(state);

        case AUTH_ERROR:
            return authError(state, action.error);

        case AUTH_SUCCESS:
            return state.set('isLoading', false);

        case USER_LOGOUT_DONE:
            return logoutUser(state);

        case AUTH_RESET_FORM:
            return state.set('errorMessage', '');

        case UPDATE_USER_DATA:
            return updateUserData(state, action.data);

        case AUTH_START_WITH_FACEBOOK:
            return authStartWithFacebook(state);

        case AUTH_ERROR_WITH_FACEBOOK:
            return authErrorWithFacebook(state, action.error);

        case AUTH_SUCCESS_WITH_FACEBOOK:
            return state.set('isLoadingFacebook', false);

        case NAME_CHANGED:
            return nameChanged(state, action);

        default:
            return state;
    }
}
