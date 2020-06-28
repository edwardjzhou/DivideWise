import { combineReducers } from "redux";
import sessionReducer from "./session_errors_reducer";
import signupReducer from "./signup_errors_reducer";
import friendReducer from "./friend_errors_reducer";

export default combineReducers({
  session: sessionReducer,
  signup: signupReducer,
  friend: friendReducer,
});
