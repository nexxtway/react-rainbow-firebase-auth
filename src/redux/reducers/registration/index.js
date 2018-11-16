/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    CREATE_ACCOUNT_LOADING,
    CREATE_ACCOUNT_SUCCESS,
} from '../../actions/registration';
import { SHOW_ERROR_MESSAGE } from '../../actions/app/show-error-message';

const initialState = fromJS({
    isLoading: false,
});

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

        default:
            return state;
    }
}
