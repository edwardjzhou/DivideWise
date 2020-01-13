import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill} from '../../actions/bill_actions'
import { Link } from 'react-router-dom';


class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchBills()
    }

    render() {
        return (
            <div id="dashboard">
                DASHBOARD:  {this.props.current_user} dropdown logout here
                <div id="YOU_OWE"> 
                    {
                        this.props.bills.map(bill => 
                        (
                            <Link to={`/friends/${bill.lender_id}`}>
                                <p key={bill.id}>
                                        <span> {bill.created_at} {bill.borrower} owes {bill.lender} $ {bill.amount} </span>
                                </p>
                        
                            </Link> 
                        ))
                    }

                </div>
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        //user: Object.values(state.entities.users)[0].username,
        current_user: state.entities.users[state.session.id].username
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
    }
}

export default connect(mSTP, mDTP)(Dashboard)