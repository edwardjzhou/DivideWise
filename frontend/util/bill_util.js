export const fetchBills = () => (
    $.ajax({
        method: 'GET',
        url: 'api/bills'
    })
);

export const fetchBill = id => (
    $.ajax({
        method: 'GET',
        url: `api/bill/${id}`
    })

);
export const createBill = bill => (
    $.ajax({
        method: 'POST',
        url: 'api/bills',
        data: { bill }
    })
);

export const createPayment = payment => (
    $.ajax({
        method: 'POST',
        url: `api/bills/${payment[bill_id]}/payments`,
        data: {payment},
        // contentType: false,
        // processData: false
    })
);
export const createComment = comment => (
    $.ajax({
        method: 'POST',
        url: `api/bills/${comment[bill_id]}/comments`,
        data: {comment},
        // contentType: false,
        // processData: false
    })
);

