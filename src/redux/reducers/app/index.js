/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    START_APP_INITIALIZATION,
    DONE_APP_INITIALIZATION,
} from '../../actions/app';
import { AUTHENTICATE_USER } from '../../actions/authentication/authenticate-user';
import { UNAUTHENTICATE_USER } from '../../actions/authentication/unauthenticate-user';
import * as userGetters from './user-getters';


const initialState = fromJS({
    isInitializing: true,
    isLoading: false,
    spinnerTitle: '',
    spinnerMessage: '',
    screenWidth: '',
    currentUser: null,
});

function authenticateUser(state, user) {
    return state.set('currentUser', {
        ...user,
        ...userGetters,
    });
}

export default function (state = initialState, action) {
    switch (action.type) {
        case START_APP_INITIALIZATION:
            return state.set('isInitializing', true);

        case DONE_APP_INITIALIZATION:
            return state.set('isInitializing', false);

        case AUTHENTICATE_USER:
            return authenticateUser(state, action.user);

        case UNAUTHENTICATE_USER:
            return state.set('currentUser', null);

        default:
            return state;
    }
}
