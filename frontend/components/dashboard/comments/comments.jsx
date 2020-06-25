import React from "react";
import { connect } from "react-redux";
import {
  fetchComments,
  createComment,
  deleteComment,
} from "../../../actions/comment_actions";
import { Skeleton, Bone } from "react-loading-skeleton-placeholders";
import { getUsers } from "../../../actions/session_actions";
import { CommentItem } from "./styledComments"

class Comments extends React.Component {
  constructor(props) {
    /* props are billId: number */
    super(props);
    this.textInput = React.createRef();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchComments(this.props.billId);
  }

  commentItem(data) {
    const { id, user_id, bill_id, body, created_at } = data;
    return (
      <CommentItem>
        <span
          data-comment-id={id}
          onClick={this.handleDelete}
          style={{ float: `right` }}
        >
          ×
        </span>
        User_ID:{user_id} <br />
        {getDate(created_at)}
        <br />
        {body}
      </CommentItem>
    );

    function getDate(date) {
      date = new Date(date);
      let day = date.getDay();
      return date.toLocaleString("default", { month: "long" }) + " " + day;
    }
  }

  handleSubmit(e) {
    const newComment = {
      body: this.textInput.current.value,
    };

    this.props.createComment(newComment);
    this.textInput.current.value = "";
  }

  handleDelete(e) {
    let response = confirm("Are you sure you want to delete this comment?");
    if (response) this.props.deleteComment(e.target.getAttribute(`data-comment-id`));
  }

  /* this.props.comments = [] if there are no comments
  this.props.comments = [  {}, {}] if there are comments
  this.props.comments = null if we havent loaded comments yet */
  render() {
    return (
      <div key={this.props.billId} style={{ ...this.props.style }}>
        <div>
          {/* <Bone height={25} /> */}

          {this.props.comments instanceof Array ? (
            this.props.comments.map((comment) => this.commentItem(comment))
          ) : (
            <>
              <Skeleton skull={false} amount={3} />
            </>
          )}

          <textarea
            placeholder="Add a comment"
            cols="40"
            rows="2"
            ref={this.textInput}
          />
          <button className="orangebutton" onClick={this.handleSubmit}>
            Post
          </button>
        </div>
      </div>
    );
  }
}

const mSTP = (state, ownProps) => {
  return {
    comments: state.entities.comments[ownProps.billId], // state.entities.comments is an object of array with eles pointing to other objects { billId1 : {id: 1,user_id,bill_id, body,}}}
    friends: Object.values(state.entities.friends), // state.entities.friends is an object with each key being a friendship_id. after object.values its an array of objects
  };
};
//                               (state) => stateProps                      (state, ownProps) => stateProps
// mapStateToProps runs when:     store state changes 	                    store state changes or  any field of ownProps is different
// component re-renders when:      any field of stateProps is different	    any field of stateProps is different or any field of ownProps is different

// mDTP is run whenever the connected component receives new ownPROPS or re-render from new props from mstp, so it's always up-to-date
const mDTP = (dispatch, ownProps) => {
  return {
    getUsers: () => dispatch(getUsers()),
    fetchComments: (billId) => dispatch(fetchComments(billId)),
    createComment: (comment) =>
      dispatch(createComment(comment, ownProps.billId)),
    deleteComment: (commentId) =>
      dispatch(deleteComment(commentId, ownProps.billId)),
  };
};

export default connect(mSTP, mDTP)(Comments);
