import React from "react";
import { Provider } from "react-redux";
import {
//   Route,
//   Redirect,
  Switch,
//   Link,
//   NavLink,
//   HashRouter,
} from "react-router-dom";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import SignupFormContainer from "./session_form/signup_form_container";
import LoginFormContainer from "./session_form/login_form_container";
import Splash from "./static/splash";
import Dashboard from "./dashboard/dashboard";
import Modal from "./modal/modal";

class App extends React.Component {
  render() {
    return (
      <>
        <Modal />
        <Switch>
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/friends/:friendId" component={Dashboard} /> 
          <AuthRoute path="/login" component={LoginFormContainer} />
          <AuthRoute path="/signup" component={SignupFormContainer} />
          <AuthRoute path="/" component={Splash} />
        </Switch>
      </>
    );
  }
}

export default App;


// import Comments from "./dashboard/comments";
// import Comments, { OMG, Test } from './dashboard/comments';

// class App extends React.Component {
//   render() {
//     return (
//       <>
//       <Test/>
//         {/* <Comments/>
//         <OMG></OMG> */}
//       </>
//     )
//   }
// }
// export default App;


// For example, rather than just connecting a < UserList > component and reading the entire array of users, 
// have < UserList > retrieve a list of all user IDs, render list items as <UserListItem userId = { userId }>, 
// and have < UserListItem > be connected and extract its own user entry from the store.


//redux is for 1. GLOBAL/shared components 2. values need caching 3. GRANULARITY FOR CHILDREN
// use styco for styled components just installed addon in vscode
//https://www.reddit.com/r/reactjs/comments/ghmrbg/a_vscode_extension_to_refactor_htmltags_with/

// mstp happens after dispatch but not immediatley after 