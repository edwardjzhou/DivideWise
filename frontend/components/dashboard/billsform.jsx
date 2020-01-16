import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';

class BillsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            owes: null,
            owed: null,
            allin: null,
        }
    }

    componentDidMount() {
        // this.props.fetchBills()
        // setTimeout(() => this.calculateTotalYouOwe(), 200)
        // // this.calculateTotalYouOwe()
    }




    render() {

        return (
            <div> bills form 
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        // bills: Object.values(state.entities.bills),
        // current_user: state.entities.users[state.session.id]
    }
}

const mDTP = (dispatch) => {
    return {
        // fetchBills: () => dispatch(fetchBills()),
        // openModal: modal => dispatch(openModal(modal))

    }
}

export default connect(mSTP, mDTP)(BillsForm)


