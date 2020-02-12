import { combineReducers } from 'redux';
import users from './users_reducer';
import bills from './bills_reducer';
import friends from './friends_reducer';


export default combineReducers({
   users: users,
   bills: bills,
   friends: friends
 });

