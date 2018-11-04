import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { reducer as formReducer } from 'redux-form';

export default createStore(
    combineReducers({
            ...allReducers,
        form: formReducer,
    }),
    applyMiddleware(thunk),
);
