import * as APIUtil from '../util/friends_util';

export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_FRIEND = 'RECEIVE_FRIEND';


export const receiveFriends = () => {
    return {
        type: RECEIVE_FRIENDS,
        friends
    }
};

export const receiveFriend = friend => {
    return {
        type: RECEIVE_FRIEND,
        friend
    }
};

export const createFriend = friend => dispatch => (
    APIUtil.createFriend(friend).then(createdFriend => (
        dispatch(receiveFriend(createdFriend))
    ))
);

export const fetchFriends = () => dispatch => (
    APIUtil.fetchFriends().then(fetchedFriends => (
        dispatch(receiveFriends(fetchedFriends))
    ))
);