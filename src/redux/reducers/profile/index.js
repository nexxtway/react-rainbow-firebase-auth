import { fromJS } from 'immutable';

import {
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_END,
} from '../../actions/profile/update-profile';
import { SHOW_REAUTHENTICATE_MODAL } from '../../actions/profile/show-reauthenticate-modal';
import { HIDE_REAUTHENTICATE_MODAL } from '../../actions/profile/hide-reauthenticate-modal';
import { USER_LOGOUT_DONE } from '../../actions/authentication';

const initialState = fromJS({
    isLoading: false,
    showModal: false,
});

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE_START:
            return state.set('isLoading', true);

        case UPDATE_PROFILE_END:
            return state.set('isLoading', false);

        case SHOW_REAUTHENTICATE_MODAL:
            return state.set('showModal', true);

        case HIDE_REAUTHENTICATE_MODAL:
            return state.set('showModal', false);

        case USER_LOGOUT_DONE:
            return initialState;

        default:
            return state;
    }
}
