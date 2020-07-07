// https://www.w3schools.com/howto/default.asp
// THIS TEACHES YOU ALL THE HTML ELEMENTS LIKE accordions (HAD so much trouble figuring out what it was called), dropdowns
// go here first.

// monolithic app needs to have resuable components like given an array of objects i always just want to list it out
// but i have weird html and css problems

// biz logic in the page not the underlying components. so the wrapper for the page should have it and provides
// Q: does this mean that given you are logged in in dividewise. you will be seeing my dashboard wrapper
// all biz logic and subscrioptions should be to the wrapper?

//gridify and remove floats for cols. too difficult to work with https://css-tricks.com/snippets/css/complete-guide-grid/

import React from "react";
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

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG");

class App extends React.Component {
  render() {
    return (
      <>
        <Elements stripe={stripePromise}>
          <Modal />
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/friends/:friendId" component={Dashboard} />
            <AuthRoute path="/login" component={LoginFormContainer} />
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/" component={Splash} />
          </Switch>
        </Elements>
      </>
    );
  }
}

export default App;
