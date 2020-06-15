import * as APIUtil from "../util/session_api_util";
import * as OAUTHUtil from '../components/session_form/oauthsession'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_SIGNUP_ERRORS = "RECEIVE_SIGNUP_ERRORS";
export const ATTEMPTING_LOGIN = "ATTEMPTING_LOGIN";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"

// special thing for finding all users in add friends form
export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const getUsers = () => (dispatch) =>
  APIUtil.getUsers().then((users) => dispatch(receiveUsers(users)));
//end friends form

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

export const logoutCurrentUser = (user) => ({
  type: LOGOUT_CURRENT_USER,
  user
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const receiveErrorsSignup = (errors) => ({
  type: RECEIVE_SIGNUP_ERRORS,
  errors,
});

export const attemptingLogin = () => ({type: ATTEMPTING_LOGIN })

export const clearSessionErrors = () => ({type: CLEAR_SESSION_ERRORS})
//end normal action creators

//thunk action creators

export const signup = (user) => (dispatch) => {
  dispatch(clearSessionErrors())
  APIUtil.signup(user).then(
    (user) => dispatch(receiveCurrentUser(user)),
    (err) => dispatch(receiveErrorsSignup(err.responseJSON))
  );
}

export const login = (user) => (dispatch) => {
  dispatch(clearSessionErrors())
  dispatch(attemptingLogin());
  APIUtil.login(user).then(
    (user) => dispatch(receiveCurrentUser(user)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );
}

export const logout = () => (dispatch) =>
  APIUtil.logout().then(
    (user) => {
      dispatch(logoutCurrentUser(user))  
    }
  );


export const edwardAUTH = (id_token,email) => (dispatch) => {
  dispatch(clearSessionErrors())
  dispatch(attemptingLogin());
  OAUTHUtil.verifyOAUTH(id_token,email)
  .then( 
    (user) => dispatch(receiveCurrentUser(user)),
    (err) => dispatch(receiveErrors(err.responseJSON)) 
    );
};