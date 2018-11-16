/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    CREATE_ACCOUNT_LOADING,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_RESET_FORM,
} from '../../actions/registration';
import { SHOW_ERROR_MESSAGE } from '../../actions/app/show-error-message';
import { USER_LOGOUT_DONE } from '../../actions/authentication';

const initialState = fromJS({
    isLoading: false,
    errorMessage: '',
    user: null,
});

function logoutUser(state) {
    return state.set('user', null);
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_ACCOUNT_LOADING:
            /* eslint-disable no-param-reassign */
            state = state.set('errorMessage', '');
            return state.set('isLoading', true);

        case SHOW_ERROR_MESSAGE:
            /* eslint-disable no-param-reassign */
            return state.set('isLoading', false);

        case CREATE_ACCOUNT_SUCCESS:
            return state.set('isLoading', false);

        case CREATE_ACCOUNT_RESET_FORM:
            return state.set('errorMessage', '');

        case USER_LOGOUT_DONE:
            return logoutUser(state);

        default:
            return state;
    }
}
