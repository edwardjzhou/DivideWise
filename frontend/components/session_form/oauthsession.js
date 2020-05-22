export const fetchOAUTH = (id_token) =>
    $.ajax({
        method: "GET",
        url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
    });

