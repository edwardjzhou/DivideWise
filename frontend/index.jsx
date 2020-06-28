import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
// import { login, signup } from "./util/session_api_util";
// import { fetchFriends } from "./actions/friend_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (window.currentUser) {
    //currentUser is bootstrapped by rails views from root.html.erb testing for a user cookie into a window variable
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
