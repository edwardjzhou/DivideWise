import $ from 'jquery'

export const login = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: { user },
  });
};

export const signup = (user) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: { user },
  });
};

export const logout = () => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session",
  });
};

// should get every user except current_user
export const getUsers = () => {
  return $.ajax({
    method: "GET",
    url: "/api/users",
  });
};
