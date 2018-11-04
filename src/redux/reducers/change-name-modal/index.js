/* eslint-disable no-param-reassign */
import { fromJS } from 'immutable';
import {
    OPEN_CHANGE_NAME_MODAL,
} from './../../actions/change-name-modal/open-change-name-modal';
import {
    CLOSE_CHANGE_NAME_MODAL,
} from '../../actions/change-name-modal/close-change-name-modal';
import {
    ERROR_CHANGING_NAME,
    CHANGING_NAME,
    NAME_CHANGED,
} from './../../actions/change-name-modal/change-name';

const initialState = fromJS({
    isOpen: false,
    displayName: '',
    isLoading: false,
    error: null,
});

function openModal(state, action) {
    state = state.set('isOpen', true);
    return state.set('displayName', action.displayName);
}

function closeModal(state) {
    state = state.set('error', null);
    return state.set('isOpen', false);
}

function changingName(state) {
    return state.set('isLoading', true);
}

function nameChanged(state) {
    state = state.set('isOpen', false);
    state = state.set('error', null);
    return state.set('isLoading', false);
}

function showError(state, { error }) {
    state = state.set('error', error);
    return state.set('isLoading', false);
}

export default function pricePickerModal(state = initialState, action) {
    switch (action.type) {
        case OPEN_CHANGE_NAME_MODAL:
            return openModal(state, action);

        case CLOSE_CHANGE_NAME_MODAL:
            return closeModal(state);

        case CHANGING_NAME:
            return changingName(state);

        case NAME_CHANGED:
            return nameChanged(state);

        case ERROR_CHANGING_NAME:
            return showError(state, action);

        default:
            return state;
    }
}
