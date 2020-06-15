import $ from 'jquery'

export const fetchComments = (billId) =>
    $.ajax({
        method: "GET",
        url: `api/bills/${billId}/comments`,
    });


export const createComment = (comment) =>
    $.ajax({
        method: "POST",
        url: `api/bills/${comment[`bill_id`]}/comments`,
        data: { comment },
    });

export const destroyComment = (commentId) => 
    $.ajax({
        method: "DESTROY",
        url: `api/comments`,
        data: {commentId}
    })

// export const fetchComment = (commentId) =>
//     $.ajax({
//         method: "GET",
//         url: `api/bill/${billId}/comments/commentId`,
//     });
