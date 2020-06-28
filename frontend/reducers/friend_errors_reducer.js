


  import {
    RECEIVE_FRIENDS,
    RECEIVE_FRIEND_CREATION_ERROR,
    RECEIVE_FRIEND,
  } from "../actions/friend_actions";

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIEND_CREATION_ERROR:
      return action.error // should be an array of errors in this case just one error
    case RECEIVE_FRIENDS:
      return [];
    case RECEIVE_FRIEND:
      return [];
    default:
      return state;
  }
};
