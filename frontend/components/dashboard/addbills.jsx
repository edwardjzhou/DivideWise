import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';



const AddBills = ({ currentUser, logout, openModal }) => {

    const sessionLinks = () => (
        <nav>
            <button className='orangebutton' style={{}} onClick={() => openModal('BillCreate')}>Add an Expense</button>
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
)(AddBills);
