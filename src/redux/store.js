import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import allReducers from './reducers';
import i18n from '../i18n/reducer';

export default createStore(
    combineReducers({
        ...allReducers,
        i18n,
        form: formReducer,
    }),
    applyMiddleware(thunk),
);
