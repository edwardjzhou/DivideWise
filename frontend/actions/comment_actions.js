import * as APIUtil from "../util/comment_util";

export const RECEIVE_COMMENT = "RECEIVE_COMMENT";
export const REMOVE_COMMENT = "REMOVE_COMMENT";
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export const UPLOADING_COMMENT = "UPLOADING_COMMENT";
export const BEGIN_FETCHING_COMMENTS = "BEGIN_FETCHING_COMMENTS";

// action creators
export const receiveComments = (comments, billId) => {
    return {
        type: RECEIVE_COMMENTS,
        comments,
        billId,
    };
};

export const receiveComment = (comment, billId) => {
    return {
        type: RECEIVE_COMMENT,
        comment,
        billId
    };
};

// stick this into comments or into UI reducer? ill do comments reducer
export const beginFetchingComments = (billId) => {
    return {
        type: BEGIN_FETCHING_COMMENTS,
        billId
    }
}

export const removeComment = (comment_id, bill_id) => {
    return {
        type: REMOVE_COMMENT,
        comment_id,
        bill_id
    }
}

// END ACTION CREATORS

// BEGIN THUNK ACTION CREATORS

export const deleteComment = function(commentId, bill_id) {
    return function (dispatch) {
        APIUtil.destroyComment(commentId).then( 
            (successfulDestructionMessage) => {
                alert(successfulDestructionMessage);
                dispatch(removeComment(parseInt(commentId), bill_id))
            },
            (err) => alert(err)
        )
    }
}

export const createComment = (comment, bill_id) => (dispatch) => {
    APIUtil.createComment(comment, bill_id).then( 
        (newComment) => dispatch(receiveComment(newComment, bill_id))
        ,
        (err) => dispatch(receiveComment(err))
    )
}

// thunk action creators with a side effect UI-related dispatch after getting dispatch from the store configged with thunk middleware
// fetchcomments get all comments relating to this one bill and is run on any or many bill componetn being rendered in frinedsbills component
export const fetchComments = function (billId){ 
        return function (dispatch) {
            // dispatch(beginFetchingComments(billId))

            APIUtil.fetchComments(billId).then( (fetchedComments) => 
                    dispatch(receiveComments(fetchedComments, billId)) 
                    ,(err) =>
                    dispatch(receiveComments(err, billId)) 
                
            )
        }
};
// http://localhost:3000/api/bills/3/comments
// comments given a BILL ID are an array of COMMENT OBJECTS 
// [{ "id": 4, "user_id": 1, "bill_id": 3, "body": "I will pay you back next week", "created_at": "2020-05-15 08:26:39.393352", "updated_at": "2020-05-15 08:26:39.393352" }, { "id": 5, "user_id": 3, "bill_id": 3, "body": "Sounds good to me friend", "created_at": "2020-05-15 08:26:39.397522", "updated_at": "2020-05-15 08:26:39.397522" }, { "id": 6, "user_id": 1, "bill_id": 3, "body": "Thank you for your magnanimity", "created_at": "2020-05-15 08:26:39.401345", "updated_at": "2020-05-15 08:26:39.401345" }]

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
