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

    // const [isVisible, setVisibility] = React.useState(false);
    function collapseSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        var sectionHeight = element.scrollHeight;

        // temporarily disable all css transitions
        var elementTransition = element.style.transition;
        element.style.transition = '';

        // on the next frame (as soon as the previous style change has taken effect),
        // explicitly set the element's height to its current pixel height, so we 
        // aren't transitioning out of 'auto'
        requestAnimationFrame(function () {
            element.style.height = sectionHeight + 'px';
            element.style.transition = elementTransition;

            // on the next frame (as soon as the previous style change has taken effect),
            // have the element transition to height: 0
            requestAnimationFrame(function () {
                element.style.height = 0 + 'px';
            });
        });

        // mark the section as "currently collapsed"
        element.setAttribute('data-collapsed', 'true');
    }

    function expandSection(element) {
        // get the height of the element's inner content, regardless of its actual size
        var sectionHeight = element.scrollHeight;

        // have the element transition to the height of its inner content
        element.style.height = sectionHeight + 'px';

        // when the next css transition finishes (which should be the one we just triggered)
        element.addEventListener('transitionend', function (e) {
            // remove this event listener so it only gets triggered once
            element.removeEventListener('transitionend', arguments.callee);

            // remove "height" from the element's inline styles, so it can return to its initial value
            element.style.height = null;
        });

        // mark the section as "currently not collapsed"
        element.setAttribute('data-collapsed', 'false');
    }
    function handle(e) {
        // document.getElementById(name).addEventListener('click', function (e) {
            var section = document.querySelector('.section.collapsible');
            var isCollapsed = section.getAttribute('data-collapsed') === 'true';

            if (isCollapsed) {
                expandSection(section)
                section.setAttribute('data-collapsed', 'false')
            } else {
                collapseSection(section)
            }
        };
    



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
        <div className="section collapsible" style={{ overflow: `hidden` }} id={`comments${props.billId}`} onClick={() => handle(`BILL->${bill.id}`)} >{JSON.stringify(props.comments)}</div>

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

