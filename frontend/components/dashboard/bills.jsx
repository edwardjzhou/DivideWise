import React from 'react';
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import AddBills from './addbills';


class Bills extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            owes: null,
            owed: null,
            allin: null,
        }
    }

    componentDidMount() {
        this.props.fetchBills()
        setTimeout(() => this.calculateTotalYouOwe(), 200)
        // this.calculateTotalYouOwe()
        this.forceUpdate()
    }
    
  
    calculateTotalYouOwe() {
        let owes = null;
        let owed = null;
        this.props.bills.forEach((bill) => {
            // console.log(this.props.current_user.id)
            // console.log(bill.borrower_id)

        if (this.props.current_user.id === bill.borrower_id) {
             owes += bill.amount
        } else{
            owed += bill.amount
        }
    })
        // console.log(owes)
        this.state.owes = owes
        this.state.owed = owed
        this.state.allin = owed - owes
        this.forceUpdate()
    }


    render() {
        const red = {
            color: 'red'
        };

        const green = {
            color: 'green'
        };
        return (
                <div id="YOU_OWE" className="column_main">
                <div><AddBills></AddBills></div>

{/* 
                <div>            
                    
                    <nav className="">                    <button onClick={() => openModal('BillCreate')}>Add an expense</button>
                    </nav>
                </div>
 */}


                    <div id="total_balances">

                        {this.state.allin < 0 ?
                            <div style={red}>total balance<br/>${this.state.allin/100}</div> :
                            <div style={green}>total balance<br/>${this.state.allin/100}</div>
                        }
                        {this.state.owes > 0 ?
                            <div style={red}>you owe<br/>${this.state.owes/100}</div> :
                            <div style={green}>you owe<br />${this.state.owes/100}</div>
                        }
                    
                        
                        {this.state.owed < 0 ?
                            <div style={red}>you are owed<br />{this.state.owed/100}</div> :
                            <div style={green}>you are owed<br />{this.state.owed/100}</div>
                        }
                        
                    </div>

                        {
                            this.props.bills.map(bill =>
                                (
                                    <Link to={`/friends/${bill.lender_id}`}>
                                        <p key={bill.id}>
                                            <span> {new Date(bill.created_at).toLocaleDateString("en-US")} <br />{bill.borrower}
                                                &nbsp; owes {bill.lender} ${bill.amount / 100} </span>
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
        current_user: state.entities.users[state.session.id]
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        openModal: modal => dispatch(openModal(modal))

    }
}

export default connect(mSTP, mDTP)(Bills)


