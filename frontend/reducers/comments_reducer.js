import {
    RECEIVE_COMMENT,
    REMOVE_COMMENT,
    RECEIVE_COMMENTS,
    UPLOADING_COMMENT,
    BEGIN_FETCHING_COMMENTS,
} from "../actions/comment_actions";


const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    const clonedPrevState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...clonedPrevState, [action.billId]: action.comments
                // we looked up billId = 1, now state.entities.comments = { 1: [{bill_id:1, comment_id: 23, msg:'hi'},{...}]  ...oldstuff} 
            };

        case UPLOADING_COMMENT:
            break
            
        case REMOVE_COMMENT:
                    //     delete newState[billId];
        //     return newState;
            break

        case RECEIVE_COMMENT:
            break
        
        case BEGIN_FETCHING_COMMENTS:

            // this is more of a UI action but its whatever
            return {
                ...clonedPrevState, [action.billId]: `FETCHING COMMENTS FOR BILL ID: ${action.billId}...`
            }

        // case RECEIVE_BILL:
        //     const newBill = { [action.bill.id]: action.bill };
        //     return merge({}, state, newBill);

        default:
            return state;
    }
};

export default commentsReducer;
