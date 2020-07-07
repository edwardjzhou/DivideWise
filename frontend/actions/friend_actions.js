import * as APIUtil from "../util/friends_util";

export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_FRIEND_CREATION_ERROR = "RECEIVE_FRIEND_CREATION_ERROR";

export const receiveFriends = (friends) => {
  return {
    type: RECEIVE_FRIENDS,
    friends,
  };
};

export const receiveFriend = (friend) => {
  return {
    type: RECEIVE_FRIEND,
    friend,
  };
};

export const receiveFriendCreationError = (err) => {
  return {
    type: RECEIVE_FRIEND_CREATION_ERROR,
    error: err,
  };
};

export const createFriend = (friend) => (dispatch) =>
  APIUtil.createFriend(friend).then(
    (createdFriend) => dispatch(receiveFriend(createdFriend)),
    (err) => dispatch(receiveFriendCreationError(err.responseJSON))
  );

export const fetchFriends = () => (dispatch) =>
  APIUtil.fetchFriends().then((friends) => {
    dispatch(receiveFriends(friends));
  });
