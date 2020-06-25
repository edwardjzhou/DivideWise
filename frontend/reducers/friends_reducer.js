import merge from "lodash/merge";

import {
  RECEIVE_FRIENDS,
  RECEIVE_FRIEND,
} from "../actions/friend_actions";

const friendsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_FRIENDS:
      const { friends } = action;
      return friends;
    case RECEIVE_FRIEND:
      const { friend } = action
      const newFriend = { [friend.id]: friend };
      return merge({}, state, newFriend);
    default:
      return state;
  }
};

export default friendsReducer;
