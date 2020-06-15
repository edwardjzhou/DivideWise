import { combineReducers } from "redux";

import entities from "./entities_reducer";
import ui from "./ui_reducer";
import session from "./session_reducer";
import errors from "./errors_reducer";

// const rootReducer = combineReducers({
//   entities,
//   session,
//   ui,
//   errors,
// });

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  entities,
  session,
  ui,
  errors,
});

//https://medium.com/@asher.cassetto.cohen/resetting-redux-state-with-a-root-reducer-bonus-how-to-reset-state-selectively-e2a008d0de61
const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === 'LOGOUT_CURRENT_USER') {
    // we keep a reference of the keys we want to maintain
    // other keys will be passed as undefined and this will call
    // reducers with an initial state
    // const { ui, comment } = state;

    // state = { users, comment };
    // const {bills,friends,payments,comments} = state.entities 
    
    // state.entities = {bills, friends,payments,comments}

    const { users } =state.entities
    state.entities = {users}

    // const { users, comment } = state;

    // state = { users, comment };

  }

  return appReducer(state, action);
};



export default rootReducer;
