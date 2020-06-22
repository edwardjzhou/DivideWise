
import React from "react";
import { connect } from "react-redux";
import { fetchComments, createComment, deleteComment } from "../../actions/comment_actions";
import styled, { css, keyframes } from "styled-components";
import { Skeleton, Bone } from 'react-loading-skeleton-placeholders'
import { getUsers } from "../../actions/session_actions";

// messing around with 
// 1. Refs
// 2.ownProps in mstp mdtp
// 3. skeleton for on load and crazy UI actions everywhere
// 4. ... structure and babel support for it in the reducers instead of Objec.tassign
// 5. reflectivity of data-id on a html element to be used by listener

class Comments extends React.Component {
    constructor(props) {
        super(props)
        // ALL I NEED IS A BILL ID TO MAKE A COMMENT ENCAPSULATED 
        // 1 instance of class Comments per BILL. can have multiple comments at once in that one instance
        // props are billId 
        this.textInput = React.createRef()
        this.handleDelete = this.handleDelete.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.fetchComments(this.props.billId)
    }

    commentItem( data ) {
        const CommentItem = styled.div`
        border: 1px solid #ccc;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        padding: 6px 8px;
        background: #fff;
        margin-bottom: 8px;
        word-wrap: break-word;
        `
        const { id, user_id, bill_id, body, created_at } = data
        return (
            <CommentItem>   {/* styled components ARE REFLECTIVE OF data-"" but NOT random boolean attrs*/}
                <span data-comment-id={id} onClick={this.handleDelete} style={{ float: `right` }}>×</span>
                User_ID:{user_id} <br />
                {getDate(created_at)}<br />
                {body}

            </CommentItem>
        )

        function getDate(date) {
            date = new Date(date)
            let day = date.getDay()
            return (date.toLocaleString('default', { month: 'long' }) + ' ' + day)          

        }
    }

    handleSubmit(e) {
        const newComment =  {
                                body: this.textInput.current.value
                            };

        this.props.createComment(newComment); 
        this.textInput.current.value = ""
    }

    handleDelete(e) {
        let response = confirm("Are you sure you want to delete this comment?");
        if (response) this.props.deleteComment(e.target.getAttribute(`data-comment-id`))
    }

    // this.props.comments = [] if there are no comments
    // this.props.comments = [  {}, {}] if there are comments
    // this.props.comments = null if we havent loaded comments yet
    render() {

        return (
            <div key={this.props.billId} style={{ ...this.props.style} } >
                <div>
                     {/* <Bone height={25} /> */}

                    {this.props.comments instanceof Array ? 
                    this.props.comments.map((comment) => 
                    this.commentItem(comment) ) : 
                    <>
                    < Skeleton skull={false} amount={3} /> 
                    </>}

                    <textarea placeholder="Add a comment" cols="40" rows="2" ref={this.textInput}/>
                    <button className="orangebutton" onClick={this.handleSubmit}>Post</button>

                </div>
            </div>
        )
    }

   

} 
//RE:IMPORTING:Do nothing if this module has already been evaluated. Otherwise, transitively evaluate all module dependences of this module and then evaluate this module



const mSTP = (state, ownProps) => {  
    return {
        comments: state.entities.comments[ownProps.billId],  // state.entities.comments is an object of array with eles pointing to other objects { billId1 : {id: 1,user_id,bill_id, body,}}}
        friends: Object.values(state.entities.friends) // state.entities.friends is an object with each key being a friendship_id. after object.values its an array of objects
    };
};
//                               (state) => stateProps                      (state, ownProps) => stateProps
// mapStateToProps runs when:     store state changes 	                    store state changes or  any field of ownProps is different
// component re-renders when:      any field of stateProps is different	    any field of stateProps is different or any field of ownProps is different

// mDTP is run whenever the connected component receives new ownPROPS or re-render from new props from mstp, so it's always up-to-date
const mDTP = (dispatch, ownProps) => { //ownProps
    return {
        // getUsers: dispatch(getUsers()), // this automatically runs on any state change?
        getUsers: () => dispatch(getUsers()),
        fetchComments: (billId) => dispatch(fetchComments(billId)),
        createComment: (comment) => dispatch(createComment(comment, ownProps.billId)) ,
        deleteComment: (commentId) => dispatch(deleteComment(commentId, ownProps.billId)),

    };
};

export default connect(mSTP, mDTP)(Comments)




