import { AUTHENTICATE_USER } from './../actions/authenticate';
import { UNAUTHENTICATE_USER } from './../actions/unauthenticate';
import { INIT_APP } from './../actions/start-app';
import { SHOW_ERROR_MESSAGE } from './../actions/show-error-message';
import { HIDE_ERROR_MESSAGE } from './../actions/hide-error-message';
import { RESET_PASSWORD_DETAILS } from './../actions/get-reset-password-details';

const initialState  = Object.assign({
    currentUser: null,
    isInitializing: false,
});

export default function (state = initialState, action) {
    switch(action.type) {
        case INIT_APP:
            return {
                ...state,
                isInitializing: true,
            };
        case AUTHENTICATE_USER:
            return Object.assign({}, state, {
                currentUser: action.user,
                isInitializing: false,
                isAuth: true,
            });
        case UNAUTHENTICATE_USER:
            return {
                ...state,
                currentUser: null,
                isAuth: false,
                isInitializing: false,
            };
        case SHOW_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message,
            };
        case HIDE_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: undefined,
            };
        case RESET_PASSWORD_DETAILS:
            return {
                ...state,
                resetPasswordDetails: action.details,
            };
        default:
            return state;
    }
}
