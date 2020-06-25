export const fetchOAUTH = (id_token) => {
  return fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
  ).then((res) => res.json());
};

export const verifyOAUTH = (id_token, email) => {
  const user = {
    id_token,
    email,
  };

  return fetch(`./api/googleauth`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
};
