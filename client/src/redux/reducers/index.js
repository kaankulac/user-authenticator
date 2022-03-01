import {combineReducers} from 'redux';
import isAuthReducer from './authReducer';

const rootReducer = combineReducers({
    isAuthReducer
});


export default rootReducer;