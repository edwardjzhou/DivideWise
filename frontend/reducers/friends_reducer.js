import merge from "lodash/merge";

import {
  //RECEIVE_REVIEW,
  RECEIVE_FRIENDS,
  RECEIVE_FRIEND,
} from "../actions/friend_actions";

const friendsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_FRIENDS:
      return action.friends;
    case RECEIVE_FRIEND:
      const newFriend = { [action.friend.id]: action.friend };
      return merge({}, state, newFriend);
    // case RECEIVE_REVIEW:
    //     const { review, average_rating } = action;
    //     const newState = merge({}, state);
    //     newState[review.bench_id].reviewIds.push(review.id);
    //     newState[review.bench_id].average_rating = average_rating;
    //     return newState;
    // case REMOVE_FRIEND:
    //     delete newState[billId];
    //     return newState;
    default:
      return state;
  }
};

export default friendsReducer;
