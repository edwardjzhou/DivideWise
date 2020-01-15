import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';



const AddFriends = ({ currentUser, logout, openModal }) => {

    const sessionLinks = () => (
        <nav className="">
            <button onClick={() => openModal('Add')}>+</button>
        </nav>
        
    );
    

    return (
            sessionLinks()
    );
};


const mapStateToProps = ({ session }) => ({
    currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
    openModal: modal => dispatch(openModal(modal))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddFriends);
