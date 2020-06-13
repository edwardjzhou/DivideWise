export const fetchComments = (billId) =>
    $.ajax({
        method: "GET",
        url: `api/bills/${billId}/comments`,
    });

export const fetchComment = (billId) =>
    $.ajax({
        method: "GET",
        url: `api/bill/${billId}/comments`,
    });
    
export const createComment = (comment) =>
    $.ajax({
        method: "POST",
        url: `api/bills/${comment[`bill_id`]}/comments`,
        data: { comment },
    });
