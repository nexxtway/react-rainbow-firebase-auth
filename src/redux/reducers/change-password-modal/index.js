/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    OPEN_CHANGE_PASSWORD_MODAL,
} from './../../actions/change-password-modal/open-change-password-modal';
import {
    CLOSE_CHANGE_PASSWORD_MODAL,
} from '../../actions/change-password-modal/close-change-password-modal';
import {
    ERROR_CHANGING_PASSWORD,
    CHANGING_PASSWORD,
    PASSWORD_CHANGED,
} from './../../actions/change-password-modal/change-password';

const initialState = fromJS({
    isOpen: false,
    isLoading: false,
    error: null,
});

function openModal(state) {
    return state.set('isOpen', true);
}

function closeModal(state) {
    state = state.set('error', null);
    return state.set('isOpen', false);
}

function changingPassword(state) {
    return state.set('isLoading', true);
}

function passwordChanged(state) {
    state = state.set('isOpen', false);
    state = state.set('error', null);
    return state.set('isLoading', false);
}

function showError(state, { error }) {
    state = state.set('error', error);
    return state.set('isLoading', false);
}

export default function openChangePasswordModal(state = initialState, action) {
    switch (action.type) {
        case OPEN_CHANGE_PASSWORD_MODAL:
            return openModal(state, action);

        case CLOSE_CHANGE_PASSWORD_MODAL:
            return closeModal(state);

        case CHANGING_PASSWORD:
            return changingPassword(state);

        case PASSWORD_CHANGED:
            return passwordChanged(state);

        case ERROR_CHANGING_PASSWORD:
            return showError(state, action);

        default:
            return state;
    }
}
