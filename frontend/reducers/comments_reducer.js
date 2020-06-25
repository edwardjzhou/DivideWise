import {
  RECEIVE_COMMENT,
  REMOVE_COMMENT,
  RECEIVE_COMMENTS,
  UPLOADING_COMMENT,
  BEGIN_FETCHING_COMMENTS,
} from "../actions/comment_actions";

const commentsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        [action.billId]: action.comments,
      };
    // we looked up billId = 1, now state.entities.comments = { 1: [{bill_id:1, comment_id: 23, msg:'hi'},{...}]  ...oldstuff}

    case UPLOADING_COMMENT:
      break;

    case REMOVE_COMMENT:
      const newBillComments = [];
      if (state[action.bill_id] instanceof Array)
        for (const comment of state[action.bill_id]) {
          if (comment.id !== action.comment_id) newBillComments.push(comment);
        }
      return { ...state, [action.bill_id]: newBillComments };

    case RECEIVE_COMMENT:
      let billComments;
      if (state[action.billId] instanceof Array)
        billComments = {
          [action.billId]: [...state[action.billId], action.comment],
        };
      else
        billComments = {
          [action.billId]: [action.comment],
        };

      return {
        ...state,
        ...billComments,
      };

    case BEGIN_FETCHING_COMMENTS:
      // this is more of a UI action but its whatever
      return { ...state, [action.billId]: `first fetch` };

    default:
      return state;
  }
};

export default commentsReducer;
