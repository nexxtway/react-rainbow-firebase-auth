import { fromJS } from 'immutable';

import {
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_END,
} from '../../actions/profile/update-profile';
import { USER_LOGOUT_DONE } from '../../actions/authentication';

const initialState = fromJS({
    isLoading: false,
    user: null,
});

function logoutUser(state) {
    return state.set('user', null);
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE_START:
            return state.set('isLoading', true);

        case UPDATE_PROFILE_END:
            return state.set('isLoading', false);

        case USER_LOGOUT_DONE:
            return logoutUser(state);

        default:
            return state;
    }
}
