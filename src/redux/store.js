import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers/app';
import { reducer as formReducer } from 'redux-form';

export default createStore(
    combineReducers({
        app,
        form: formReducer,
    }),
    applyMiddleware(thunk),
);
