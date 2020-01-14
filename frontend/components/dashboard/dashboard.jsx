import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill} from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import Friends from './friends'
import { logout } from '../../actions/session_actions';


class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchBills()
    }

    render() {
        return (
            <div id="dashboard" className="full-height">
                DASHBOARD:  {this.props.current_user} dropdown logout here  <button className="header-button" onClick={this.props.logout}>Log Out</button>


                <div id="friends_bar">
                    <Friends></Friends>
                </div>

                <div id="YOU_OWE" className="full-height"> 
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

                <div id="right-bar" className="full-height">
                    SPLITWISE ON THE GO
                    Get the free Splitwise app and add IOUs from anywhere:
                </div>
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        //user: Object.values(state.entities.users)[0].username,
        current_user: state.entities.users[state.session.id].username,
        // currentUser: session.currentUser

    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        logout: () => dispatch(logout()),

    }
}







export default connect(mSTP, mDTP)(Dashboard)