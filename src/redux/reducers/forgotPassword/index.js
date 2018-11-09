import { fromJS } from 'immutable';
import {
    RESET_EMAIL_SENT,
    SEND_PASS_RESET_EMAIL,
    RESET_FORM,
} from '../../actions/forgotPassword';
import { SHOW_ERROR_MESSAGE } from '../../actions/app/show-error-message';

const initialState = fromJS({
    isLoading: false,
    error: null,
    isEmailSent: false,
});

export default function (state = initialState, action) {
    /* eslint-disable no-param-reassign */
    switch (action.type) {
        case SEND_PASS_RESET_EMAIL:
            return state.set('isLoading', true);
        case RESET_EMAIL_SENT:
            state = state.set('isEmailSent', true);
            return state.set('isLoading', false);
        case SHOW_ERROR_MESSAGE:
            return state.set('isLoading', false);
        case RESET_FORM:
            return initialState;
        default:
            return state;
    }
}
