import { combineReducers } from "redux";
import modal from "./modal_reducer";
import { SELECT_FRIENDSHIP } from "../actions/ui_actions";
import merge from "lodash/merge";

const friendSelectReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SELECT_FRIENDSHIP:
      const newSelect = { [action.friendshipId]: action.friendshipId };
      return merge({}, newSelect);
    default:
      return state;
  }
};

export default combineReducers({
  modal,
  friendSelectReducer,
});
