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
        this.calculateTotalYouOwe = this.calculateTotalYouOwe.bind(this)
    }

    componentDidMount() {
        this.props.fetchBills()
        this.calculateTotalYouOwe()
    }
    
    componentDidUpdate(prevProps, prevState){
        if (prevProps.bills !== this.props.owes) {
            console.log('billsz props has changed.')
            this.calculateTotalYouOwe()
        }
    }
  

    calculateTotalYouOwe() {
        let owes = null;
        let owed = null;
        this.props.bills.forEach((bill) => {
            if (this.props.current_user.id === bill.borrower_id) {
                owes += bill.amount
            } else{
                owed += bill.amount
            }
        })
        this.setState({
            owes: owes,
            owed: owed,
            allin: owed - owes
        }
        )
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
                <div style={{ borderBottom: `1px solid #DDDDDD`, backgroundColor: `#EEEEEE`, display:'flex',
            fontWeight:`700`,lineHeight:`38px`,fontSize:`24px`, fontFamily:`Lato`, padding: `0 0 0 5px` }}>
                    Dashboard
                    <AddBills></AddBills>
                    </div>
                    <div id="total_balances" style={{backgroundColor:`#EEEEEE`}}>

                        {this.state.allin < 0 ?
                            <div style={red}>total balance<br/>${this.state.allin/100}</div> :
                            <div style={green}>total balance<br/>${this.state.allin/100}</div>
                        }
                        {this.state.owes > 0 ?
                            <div style={red}>you owe<br/>${this.state.owes/100}</div> :
                            <div style={green}>you owe<br />${this.state.owes/100}</div>
                        }
                        {this.state.owed < 0 ?
                            <div style={red}>you are owed<br />${this.state.owed/100}</div> :
                            <div style={green}>you are owed<br />${this.state.owed/100}</div>
                        }
                        
                    </div>

                        {
                            this.props.bills.map(bill =>
                                (
                                    <Link to={`/friends/${bill.lender_id}`}>
                                        <p key={bill.id}>
                                            <span>{new Date(bill.created_at).toLocaleDateString("en-US")}<br/>{bill.borrower}
                                                &nbsp;owes {bill.lender} ${bill.amount / 100}</span>
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


