import $ from 'jquery'

export const fetchFriends = () =>
  $.ajax({
    method: "GET",
    url: `api/friendships`,
    // hey: undef // random stuf is OK but something thats referenceerrored will destroy react
  });

export const createFriend = (friendship) =>
  $.ajax({
    method: "POST",
    url: "api/friendships",
    data: { friendship },
  });
