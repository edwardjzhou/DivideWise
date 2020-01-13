import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import bills from './bills_reducer';


export default combineReducers({
   users: usersReducer,
   bills: bills
 });

