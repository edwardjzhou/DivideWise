import * as APIUtil from '../util/bill_util';

export const RECEIVE_BILLS = 'RECEIVE_BILLS';
export const RECEIVE_BILL = 'RECEIVE_BILL';
export const REMOVE_BILL = 'REMOVE_BILL';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_PAYMENT = 'RECEIVE_PAYMENT';
export const RECEIVE_PAYMENTS = 'RECEIVE_PAYMENTS';


export const receiveBills = bills => {  
    return {
        type: RECEIVE_BILLS,
        bills
    }
};

export const receiveBill = bill => {
    return {
        type: RECEIVE_BILL,
        bill
    }
};

export const removeBill = billId => {
    return {
        type: REMOVE_BILL,
        billId
    }
};


export const receivePayments = payments => {
    return {
        type: RECEIVE_PAYMENTS,
        payments
    }
};

export const receivePayment = payment => {
    return {
        type: RECEIVE_PAYMENT,
        payment
    }
};


export const createBill = bill => dispatch => (
    APIUtil.createBill(bill).then(createdBill => (
        dispatch(receiveBill(createdBill))
    ))
);

export const fetchBill = billId => dispatch => (
    APIUtil.fetchBill(billId).then(fetchedBill => (
        dispatch(receiveBill(fetchedBill))
    ))
);

export const fetchBills = () => dispatch => (
    APIUtil.fetchBills().then(fetchedBills => (
        dispatch(receiveBills(fetchedBills))
    ))
);


export const createPayment = payment => dispatch => (
    APIUtil.createPayment(payment).then(createdPayment => (
        dispatch(receivePayment(createdPayment))
    ))
);

export const fetchPayments = () => dispatch => (
    APIUtil.fetchPayments().then(fetchedPayments => (
        dispatch(receivePayments(fetchedPayments))
    ))
);
