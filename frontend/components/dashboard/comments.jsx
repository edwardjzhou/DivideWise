// block eles like divs and li  can be made inline with display:inline didnt know that although the ul will still be block i guess


//setstate in the <button onClick={ ()=> thios.setstate} 
//diosplay state in render and setstate in render is smart! enver thought of it


// DESIGN DECISION: comments may be updated very fast almost chat-like/2-way-street dependent rather htan just 1 person like all my other fetches so im gonna just fetch new data nonstop

import React from "react";
import { connect } from "react-redux";
import { fetchComments } from "../../actions/comment_actions";
import styled, { css, keyframes } from "styled-components";


// const rotate = keyframes` 
//     0% {transition: height:300px;}
// 	50% {transition: height:200px;}
//     100% {transition: height:0px;}
    


// 	// 0% {transform:rotate(16deg) scale(1.2);}
// 	// 50% {transform:rotate(-16deg) scale(1.4);}
// 	// 100% {transform:rotate(16deg) scale(1.3);}
// //   from {
// //     transition: max-height 0.5s ease-in-out;
// //   }

// //   to {
// //     transition: rotate(60deg);
// //   }
// `

// const Rotate = styled.a`
//     height: auto;
//     transform: scaleY(1);
//     transform-origin: bottom;
//     transition: transform 0.26s ease;
//     &:hover {
//         transform: scaleY(.1);
//     }
//     `





// #menu #list {
//     max - height: 0;
//     transition: max - height 0.15s ease - out;
//     overflow: hidden;
//     background: #d5d5d5;
// }

// #menu: hover #list {
//     max - height: 500px;
//     transition: max - height 0.25s ease -in;
// }

function Comments ( props ) {
    // function Comments({ fetchComments, comments, isVisible, billId, ...props }) {


    React.useEffect( ()=>{
        props.fetchComments(props.billId)
    }, [props.billId] )
    // React.useEffect(() => { 
        // maybe some handle status change 
        // like api calls here
        // also this callback passed to useeffect returns a cleanup callback if you want
        // return cleanup()=>{}
        
        // document.title = `You clicked ${state1} times` });
    //   if (isOnline === null) {
    //     return 'Loading...';
    //   }
    //   return isOnline ? 'Online' : 'Offline';

    //style = {{ display: props.isVisible ? `block` : `none` }
    return (
        <div className="section collapsible" style={{ overflow: `hidden`, transition: `height 0.5s ease-out`, height:`auto` }} id={`comments${props.billId}`}  >{JSON.stringify(props.comments)}</div>

    )
} 

const mSTP = (state) => {
    return {
        comments: state.entities.comments,

    };
};

const mDTP = (dispatch) => {
    return {
        fetchComments: (billId) => dispatch(fetchComments(billId)),
    };
};

export default connect(mSTP, mDTP)(Comments)

