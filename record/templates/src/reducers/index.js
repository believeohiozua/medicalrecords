import { combineReducers } from 'redux';
import regdata_reducer from './regdata_reducer';
import errors from './errors';
import messages from './messages';
import authReducer from './authReducer';


export default combineReducers({
    regdata_reducer,
    errors,
    messages,
    authReducer,
}); 