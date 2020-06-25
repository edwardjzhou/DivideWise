import $ from "jquery";

export const fetchFriends = () =>
  $.ajax({
    method: "GET",
    url: `api/friendships`,
  });

export const createFriend = (friendship) =>
  $.ajax({
    method: "POST",
    url: "api/friendships",
    data: { friendship },
  });
