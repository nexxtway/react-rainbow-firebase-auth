import { fromJS } from 'immutable';

import {
    UPDATE_PROFILE_START,
    UPDATE_PROFILE_END,
} from '../../actions/profile/update-profile';

const initialState = fromJS({
    isLoading: false,
});

export default function (state = initialState, action) {
    /* eslint-disable no-param-reassign */
    switch (action.type) {
        case UPDATE_PROFILE_START:
            return state.set('isLoading', true);

        case UPDATE_PROFILE_END:
            return state.set('isLoading', false);

        default:
            return state;
    }
}
