import * as APIUtil from "../util/comment_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const UPLOADING_COMMENT = "UPLOADING_COMMENT";
export const DOWNLOADING_COMMENTS = "DOWNLOADING_COMMENTS";


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
