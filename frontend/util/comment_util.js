import $ from 'jquery'

export const fetchComments = (bill_id) =>
    $.ajax({
        method: "GET",
        url: `api/bills/${bill_id}/comments`,
    });

export const createComment = (comment = {}, bill_id) => // does defaultarg comment={} help? yes in the case of comment = undefined `${comment.bill_id}` wont throw and break react
    $.ajax({
        method: "POST",
        url: `api/bills/${bill_id}/comments`,
        data: { comment }, // comment= { body}
    });

export const editComment = (comment = {}, comment_id) => 
    $.ajax({
        method: "PATCH",
        url: `api/comments/${comment_id}`,
        data: { comment }, //comment= {  body }
    });

export const destroyComment = (comment_id) => 
    $.ajax({
        method: "DELETE",
        url: `api/comments/${comment_id}`,
        // data: {comment_id} 
    })

// export const fetchComment = (commentId) =>
//     $.ajax({
//         method: "GET",
//         url: `api/bill/${billId}/comments/commentId`,
//     });
// < Comment id: 1, user_id: 1, bill_id: 1, body: "I will pay you back next week", created_at: "2020-05-15 08:26:39", updated_at: "2020-05-15 08:26:39" >,