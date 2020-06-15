import $ from 'jquery'

export const fetchComments = (billId) =>
    $.ajax({
        method: "GET",
        url: `api/bills/${billId}/comments`,
    });


export const createComment = (comment = {}) => // does defaultarg comment={} help? yes in the case of comment = undefined `${comment.bill_id}` wont throw 
    $.ajax({
        method: "POST",
        url: `api/bills/${comment[`bill_id`]}/comments`,
        data: { comment },
    });

export const destroyComment = (commentId) => 
    $.ajax({
        method: "DELETE",
        url: `api/comments/${commentId}`,
        data: {commentId}
    })

// export const fetchComment = (commentId) =>
//     $.ajax({
//         method: "GET",
//         url: `api/bill/${billId}/comments/commentId`,
//     });
// < Comment id: 1, user_id: 1, bill_id: 1, body: "I will pay you back next week", created_at: "2020-05-15 08:26:39", updated_at: "2020-05-15 08:26:39" >,