/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import { DONE_APP_INITIALIZATION, SHOW_ERROR_MESSAGE, START_APP_INITIALIZATION } from '../../actions/app';
import { USER_LOGOUT_DONE } from '../../actions/authentication';
import { SHOW_SUCCESS_MESSAGE } from '../../actions/app/show-success-message';
import { HIDE_MESSAGE } from '../../actions/app/hide-message';

const initialState = fromJS({
    isInitializing: true,
    isLoading: false,
    message: undefined,
    messageVariant: undefined,
});

export default function (state = initialState, action) {
    switch (action.type) {
        case START_APP_INITIALIZATION:
            return state.set('isInitializing', true);

        case DONE_APP_INITIALIZATION:
            return state.set('isInitializing', false);

        case SHOW_ERROR_MESSAGE:
            state = state.set('message', action.message);
            return state.set('messageVariant', 'ERROR');

        case SHOW_SUCCESS_MESSAGE:
            state = state.set('message', action.message);
            return state.set('messageVariant', 'SUCCESS');

        case HIDE_MESSAGE:
            state = state.set('messageVariant', undefined);
            return state.set('message', undefined);

        case USER_LOGOUT_DONE:
            return initialState;

        default:
            return state;
    }
}
