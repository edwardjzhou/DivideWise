import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

const _nullUser = Object.freeze({
  id: null,
});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  // const clonedPrevState = Object.assign({}, state)
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      // return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
      // if (action.currentUser.updated_at)
      return Object.assign({}, state, { id: action.currentUser.id });
    case LOGOUT_CURRENT_USER:
      return Object.assign({}, _nullUser, {
        message: `You, ${action.user.username}, have successfully logged off! `,
      });
    default:
      return state;
  }
};

export default sessionReducer;
