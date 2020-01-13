import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill} from '../../actions/bill_actions'

class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchBills()
    }

    render() {
        return (
            <div id="asdf"> 
            
                asdf dashboard
             
        {this.props.bills.map(bill => (<p>{bill.lender_id} {bill.borrower_id} {bill.amount} </p>))}
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills) 
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
    }
}

export default connect(mSTP, mDTP)(Dashboard)