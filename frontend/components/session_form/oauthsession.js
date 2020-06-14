import $ from 'jquery'

// export const fetchOAUTH = (id_token) =>
//     $.ajax({
//         method: "GET",
//         url: `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
//     });

export const fetchOAUTH = async (id_token) => {
    return await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
 
};

//1.{id: 8, username: "e} from AJAX... broken response object from fetch()
// 2.receive_current_user action goes out
// 3. we get logged in via auth util

// export const verifyOAUTH = (id_token , email) => 
//     $.ajax({
//         method: "POST",
//         url: `api/googleauth`,
//         data: { 
//             user: {
//             id_token,
//             email
//         }},
//     });


export const verifyOAUTH =  (id_token, email) => {

    const user = {
        id_token,
        email
    }

    // let asdf =  await fetch(`./api/googleauth`, {
    return fetch(`./api/googleauth`, {

        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ user: user }) 
        // body data type must match "Content-Type" header
    }).then(res=>res.json())

    // return asdf
    // console.log(answer)
    // return answer 
}