import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

const Auth = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      !loggedIn ? <Component {...props} /> : <Redirect to="/dashboard" />
    }
  />
);

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route
    path={path}
    exact={exact}
    render={(props) =>
      loggedIn ? (
        <Component {...props} />
      ) : (
        // window.location.href.includes('signup') ?
        //  ( <Redirect to="/signup" /> ) :
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = (state) => ({ loggedIn: Boolean(state.session.id) }); // you can cheat your way in technically but i still have validations on everything wrt current_user so it wont help

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
