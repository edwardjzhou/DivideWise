import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';


class Bills extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchBills()
    }

    render() {
        return (
                <div id="YOU_OWE" className="column_main">
                    {
                        this.props.bills.map(bill =>
                            (
                                <Link to={`/friends/${bill.lender_id}`}>
                                    <p key={bill.id}>
                                        <span> {new Date(bill.created_at).toLocaleDateString("en-US")} <br />{bill.borrower}
                                            &nbsp; owes {bill.lender} $ {bill.amount / 100} </span>
                                    </p>

                                </Link>
                            ))
                    }
                </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
    }
}

export default connect(mSTP, mDTP)(Bills)