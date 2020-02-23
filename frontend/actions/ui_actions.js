export const SELECT_FRIENDSHIP = 'SELECT_FRIENDSHIP';

export const selectFriend = (friendshipId) => {
    return {
        type: SELECT_FRIENDSHIP,
        friendshipId

    }
}


export const select = friendshipId => dispatch => (
        dispatch(selectFriend(friendshipId))
    )