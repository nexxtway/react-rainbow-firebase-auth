/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    START_APP_INITIALIZATION,
    DONE_APP_INITIALIZATION,
    SHOW_ERROR_MESSAGE,
    HIDE_ERROR_MESSAGE,
} from '../../actions/app';

const initialState = fromJS({
    isInitializing: true,
    isLoading: false,
    errorMessage: undefined,
});

export default function (state = initialState, action) {
    switch (action.type) {
        case START_APP_INITIALIZATION:
            return state.set('isInitializing', true);

        case DONE_APP_INITIALIZATION:
            return state.set('isInitializing', false);

        case SHOW_ERROR_MESSAGE:
            return state.set('errorMessage', action.message);

        case HIDE_ERROR_MESSAGE:
            return state.set('errorMessage', undefined);

        default:
            return state;
    }
}
