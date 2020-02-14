import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';



const AddBills = ({ currentUser, logout, openModal }) => {

    const sessionLinks = () => (
        <nav style={{ marginLeft: `40%`, display:`flex`}}>
            <button style={{width: `auto`}}className='orangebutton'  onClick={() => openModal('BillCreate')}>Add an Expense</button>
            &nbsp;
            <button style={{ width: `auto`,backgroundColor:`#48be9d` }} className='orangebutton' onClick={() => openModal('PaymentCreate')}>Settle up</button>

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
