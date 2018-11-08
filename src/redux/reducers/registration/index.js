/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    CREATE_ACCOUNT_LOADING,
    CREATE_ACCOUNT_SUCCESS,
    CREATE_ACCOUNT_RESET_FORM,
} from '../../actions/registration';
import { SHOW_ERROR_MESSAGE } from '../../actions/app/show-error-message';

const initialState = fromJS({
    isLoading: false,
    errorMessage: '',
});

export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_ACCOUNT_LOADING:
            /* eslint-disable no-param-reassign */
            state = state.set('errorMessage', '');
            return state.set('isLoading', true);

        case SHOW_ERROR_MESSAGE:
            /* eslint-disable no-param-reassign */
            state = state.set('isLoading', false);
            return state.set('errorMessage', action.error);

        case CREATE_ACCOUNT_SUCCESS:
            return state.set('isLoading', false);

        case CREATE_ACCOUNT_RESET_FORM:
            return state.set('errorMessage', '');

        default:
            return state;
    }
}
