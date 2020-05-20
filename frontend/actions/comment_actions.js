import * as APIUtil from "../util/comment_util";

// export const RECEIVE_BILLS = "RECEIVE_BILLS";
// export const RECEIVE_BILL = "RECEIVE_BILL";
// export const REMOVE_BILL = "REMOVE_BILL";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
// export const RECEIVE_PAYMENT = "RECEIVE_PAYMENT";
// export const RECEIVE_PAYMENTS = "RECEIVE_PAYMENTS";

export const receiveComments = (comments) => {
    return {
        type: RECEIVE_COMMENTS,
        comments,
    };
};
export const fetchComments = (billId) => (dispatch) =>
    APIUtil.fetchComments(billId).then((fetchedComments) =>
        dispatch(receiveComments(fetchedComments))
    );

// export const receiveBill = (bill) => {
//     return {
//         type: RECEIVE_BILL,
//         bill,
//     };
// };

// export const removeBill = (billId) => {
//     return {
//         type: REMOVE_BILL,
//         billId,
//     };
// };

// export const receivePayments = (payments) => {
//     return {
//         type: RECEIVE_PAYMENTS,
//         payments,
//     };
// };

// export const receivePayment = (payment) => {
//     return {
//         type: RECEIVE_PAYMENT,
//         payment,
//     };
// };

// export const createBill = (bill) => (dispatch) =>
//     APIUtil.createBill(bill).then((createdBill) =>
//         dispatch(receiveBill(createdBill))
//     );

// export const fetchBill = (billId) => (dispatch) =>
//     APIUtil.fetchBill(billId).then((fetchedBill) =>
//         dispatch(receiveBill(fetchedBill))
//     );

// export const fetchBills = () => (dispatch) =>
//     APIUtil.fetchBills().then((fetchedBills) =>
//         dispatch(receiveBills(fetchedBills))
//     );

// export const createPayment = (payment) => (dispatch) =>
//     APIUtil.createPayment(payment).then((createdPayment) =>
//         dispatch(receivePayment(createdPayment))
//     );

// export const fetchPayments = () => (dispatch) =>
//     APIUtil.fetchPayments().then((fetchedPayments) =>
//         dispatch(receivePayments(fetchedPayments))
//     );
