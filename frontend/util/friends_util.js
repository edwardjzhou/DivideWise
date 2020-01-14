export const fetchFriends = () => (
    $.ajax({
        method: 'GET',
        url: `api/friendships`
    })

);
export const createFriend = friend => (
    $.ajax({
        method: 'POST',
        url: 'api/friendships',
        data: {friend}
    })
);