import {
    RECEIVE_COMMENT,
    REMOVE_COMMENT,
    RECEIVE_COMMENTS,
    UPLOADING_COMMENT,
    BEGIN_FETCHING_COMMENTS,
} from "../actions/comment_actions";

// destructuring arguments in func params: can alias and set defaultparamvalue ({a:c=123,b})=>{console.log(b,c)}
const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    const clonedPrevState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...clonedPrevState, [action.billId]: action.comments
            }
                // we looked up billId = 1, now state.entities.comments = { 1: [{bill_id:1, comment_id: 23, msg:'hi'},{...}]  ...oldstuff} 
        

        case UPLOADING_COMMENT:
            break
            
        case REMOVE_COMMENT:
            const newBillComments = [];
            if (clonedPrevState[action.bill_id] instanceof Array)
                for (const comment of clonedPrevState[action.bill_id]) {
                    if (comment.id !== action.comment_id) newBillComments.push(comment) 
                }
            return {...clonedPrevState, [action.bill_id]: newBillComments} 

        case RECEIVE_COMMENT:
            let billComments;
            if (clonedPrevState[action.billId] instanceof Array) 
                billComments = {
                    [action.billId]: [...clonedPrevState[action.billId], action.comment]
                };
            else 
                billComments = {
                    [action.billId]: [action.comment]
                };

            return {
                ...clonedPrevState, ...billComments
            };
        
        case BEGIN_FETCHING_COMMENTS:

            // this is more of a UI action but its whatever
            return {...clonedPrevState, [action.billId]: `first fetch`}

        // case RECEIVE_BILL:
        //     const newBill = { [action.bill.id]: action.bill };
        //     return merge({}, state, newBill);

        default:
            return state;
    }
};

export default commentsReducer;
