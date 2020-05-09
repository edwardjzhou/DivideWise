export const fetchComments = () =>
    $.ajax({
        method: "GET",
        url: "api/bills",
    });

export const fetchComment = (id) =>
    $.ajax({
        method: "GET",
        url: `api/bill/${id}`,
    });
    
export const createComment = (bill) =>
    $.ajax({
        method: "POST",
        url: "api/bills",
        data: { bill },
    });

export const createPayment = (payment, bill_id) =>
    $.ajax({
        method: "POST",
        url: `api/bills/${bill_id}/payments`,
        data: { payment },
        // contentType: false,
        // processData: false
    });
export const fetchPayments = () =>
    $.ajax({
        method: "GET",
        url: "api/bills",
    });

export const createComment = (comment) =>
    $.ajax({
        method: "POST",
        url: `api/bills/${comment[bill_id]}/comments`,
        data: { comment },
        // contentType: false,
        // processData: false
    });
