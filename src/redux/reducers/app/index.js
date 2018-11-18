/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    DONE_APP_INITIALIZATION,
    START_APP_INITIALIZATION,
    SHOW_ERROR_MESSAGE,
    SHOW_SUCCESS_MESSAGE,
    HIDE_MESSAGE,
} from '../../actions/app';
import { USER_LOGOUT_DONE } from '../../actions/authentication';

const initialState = fromJS({
    isInitializing: true,
    isLoading: false,
    message: undefined,
    messageVariant: undefined,
});

function showErrorMessage(state, message) {
    state = state.set('message', message);
    return state.set('messageVariant', 'error');
}

function showSuccessMessage(state, message) {
    state = state.set('message', message);
    return state.set('messageVariant', 'success');
}

function hideMessage(state) {
    return state.set('message', undefined);
}

export default function (state = initialState, action) {
    switch (action.type) {
        case START_APP_INITIALIZATION:
            return state.set('isInitializing', true);

        case DONE_APP_INITIALIZATION:
            return state.set('isInitializing', false);

        case SHOW_ERROR_MESSAGE:
            return showErrorMessage(state, action.message);

        case SHOW_SUCCESS_MESSAGE:
            return showSuccessMessage(state, action.message);

        case HIDE_MESSAGE:
            return hideMessage(state);

        case USER_LOGOUT_DONE:
            return initialState;

        default:
            return state;
    }
}
