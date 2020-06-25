import { combineReducers } from "redux";

import entities from "./entities_reducer";
import ui from "./ui_reducer";
import session from "./session_reducer";
import errors from "./errors_reducer";


const appReducer = combineReducers({
  /* top-level reducers */
  entities,
  session,
  ui,
  errors,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_CURRENT_USER") {
    const { users } = state.entities;
    state.entities = { users }; //we retain slice state={users:{}} in order to show successful log-out information
  }

  return appReducer(state, action);
};

export default rootReducer;
