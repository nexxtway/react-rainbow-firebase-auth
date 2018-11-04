/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    START_APP_INITIALIZATION,
    DONE_APP_INITIALIZATION,
    START_APP_LOADING,
    END_APP_LOADING,
    SCREEN_RESIZE,
} from './../../actions/app';

const initialState = fromJS({
    isInitializing: true,
    isLoading: false,
    spinnerTitle: '',
    spinnerMessage: '',
    screenWidth: '',
});

function startAppLoading(state, title, message) {
    state = state.set('isLoading', true);
    state = state.set('spinnerTitle', title);
    return state.set('spinnerMessage', message);
}

function endAppLoading(state) {
    state = state.set('isLoading', false);
    state = state.set('spinnerTitle', '');
    return state.set('spinnerMessage', '');
}

function screenResize(state, screenWidth) {
    if (screenWidth < 990 && screenWidth > 600) {
        return state.set('screenWidth', 'medium');
    }
    if (screenWidth <= 600) {
        return state.set('screenWidth', 'small');
    }
    return state.set('screenWidth', 'large');
}

export default function (state = initialState, action) {
    switch (action.type) {
        case START_APP_INITIALIZATION:
            return state.set('isInitializing', true);

        case DONE_APP_INITIALIZATION:
            return state.set('isInitializing', false);

        case START_APP_LOADING:
            return startAppLoading(state, action.title, action.message);

        case END_APP_LOADING:
            return endAppLoading(state);

        case SCREEN_RESIZE:
            return screenResize(state, action.screenWidth);

        default:
            return state;
    }
}
