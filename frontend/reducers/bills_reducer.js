import merge from 'lodash/merge';

import {
    //RECEIVE_REVIEW,
    RECEIVE_BILLS,
    RECEIVE_BILL,
    REMOVE_BILL
} from '../actions/bill_actions';

const billsReducer = (state = {}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_BILLS:
            return action.bills;
        case RECEIVE_BILL:
            const newBill = { [action.bill.id]: action.bill };
            return merge({}, state, newBill);
        case REMOVE_BILL:
            delete newState[billId];
            return newState;
        default:
            return state;
    }
};

export default billsReducer;
