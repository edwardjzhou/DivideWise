import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
// import { login, signup } from "./util/session_api_util";
// import { fetchFriends } from "./actions/friend_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    //currentUser is bootstrapped by rails from root.html.erb
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser },
      },
      session: { id: window.currentUser.id },
    };
    store = configureStore(preloadedState);
    //     delete window.currentUser;
  } else {
    store = configureStore();
  }
  //store = configureStore();

  const root = document.getElementById("root");
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.login = login;
  // window.signup = signup;
  // window.store = store;
  // window.fetchFriends = fetchFriends;
  // window.preloadedState = preloadedState

  ReactDOM.render(<Root store={store} />, root);
});
