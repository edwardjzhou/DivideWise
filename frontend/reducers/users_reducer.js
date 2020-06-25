import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USERS,
} from "../actions/session_actions";

// state mentioned here is basically ONLY THE SLICE OF STATE for users. The object with the key users:{}

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });
    case RECEIVE_USERS: // everyone but currentuser from index controller of users route
      return action.users;
    default:
      return state;
  }
};

export default usersReducer;
