import merge from 'lodash/merge';

import {
    RECEIVE_PAYMENTS,
    RECEIVE_PAYMENT,
} from '../actions/bill_actions';

const paymentsReducer = (state = {}, action) => {
    Object.freeze(state)
    let newState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_PAYMENTS:
            return action.bills;
        case RECEIVE_PAYMENT:
            const newPayment = { [action.payment.id]: action.payment };
            return merge({}, state, newPayment);
        default:
            return state;
    }
};

export default paymentsReducer;
