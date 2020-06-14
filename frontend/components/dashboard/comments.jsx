// ALL I NEED IS A BILL ID TO MAKE A COMMENT ENCAPSULATED 

import React from "react";
import { connect } from "react-redux";
import { fetchComments, createComment, deleteComment } from "../../actions/comment_actions";
import styled, { css, keyframes } from "styled-components";
import { Skeleton, Bone } from 'react-loading-skeleton-placeholders'

class Comments extends React.Component {
    // props are billId and donthandle
    constructor(props) {
        super(props)
        this.dontHandle = this.dontHandle.bind(this)
    }

    componentDidMount(){
        this.props.fetchComments(this.props.billId)
    }

    dontHandle(e) {
        e.stopPropagation()
    }

    commentItem(data ) {
        const Item = styled.div`
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
            <div>
                <span style={{ float: `right` }}>×</span>

                {user_id} <br />
                {Date(created_at)}<br />
                {body}

            </div>
        )
    }

    handleSubmit() {
        this.props.createComment(
            {
                billId: props.billId
            }
        )
    }

    render() {

        return (
            <div style={{ display: ``, overflow: ``, height: `auto` }}
                onClick={this.dontHandle}>
                {/* <div style={{ marginLeft: `50%`}}> */}
                <div>
                    {/* <Bone height={25}></Bone>
    <Skeleton skull={true} amount={5}></Skeleton> */}

                    {this.props.comments.map((comment) => 
                    this.commentItem(comment) )}

                    <textarea placeholder="Add a comment" cols="40" rows="2" />
                    <button onClick={this.handleSubmit}>Post</button>

                </div>
            </div>
        )
    }

   

} 

const mSTP = (state) => {
    return {
        comments: Object.values(state.entities.comments),  // state.entities.comments is an array with eles pointing to other objects { billId1 : {id: 1,user_id,bill_id, body,}}}
        friends: Object.values(state.entities.friends) // state.entities.friends is an object with each key being a friendship_id. after object.values its an array of objects
    };
};

const mDTP = (dispatch) => {
    return {
        fetchComments: (billId) => dispatch(fetchComments(billId)),
        createComment: (comment) => dispatch(createComment(comment)) 
    };
};

export default connect(mSTP, mDTP)(Comments)




