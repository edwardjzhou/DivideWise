import React from 'react';
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import AddBills from './addbills';
import { select } from '../../actions/ui_actions'




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
        if (prevProps.bills !== this.props.bills) {
            // console.log('billsz props has changed.')
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

    findFriendship(nameOfFriend){
        // console.log(this.props.friends.length)
        // console.log(nameOfFriend)
        // for (let i = 0; i < this.props.friends.length; i++){
        //     console.log(this.props.friends[i].friends_name == nameOfFriend)
        // }
       return this.props.friends.filter( friend=> {
           return nameOfFriend === friend.friends_name
        }).map(friend => friend.id)[0]
        
    }

    render() {
        const red = {
            color: 'red',
            borderStyle: `solid`,
            width: `30%`,
            borderColor: `#DDDDDD`,
            display: `inline-block`,
            margin: `0 0 0 0`,
            padding: `0 0 0 0`,
            position: `relative`,
            top: `50%`,
            transform: `translateY(-50%)`,
            borderWidth: `0 1px 0 0`,
	        color: `#ff652f`,
            textAlign: `center`,
            fontSize: `13px`,
            lineHeight: `16px`,
            fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
            textRendering: `optimizeLegibility`,
        };

        const green = {
            color: 'green',
            borderStyle: `solid`,
            width: `30%`,
            borderColor: `#DDDDDD`,
            display: `inline-block`,
            margin: `0 0 0 0`,
            padding: `0 0 0 0`,
            textAlign: `center`,
            position: `relative`,
            top: `50%`,
            transform: `translateY(-50%)`,
            borderWidth: `0 1px 0 0`,
            color: `#5bc5a7`,
            textAlign: `center`,
            fontSize: `13px`,
            lineHeight: `16px`,
            fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
            textRendering: `optimizeLegibility`,
        };

        const redlazy = {
            color: 'red',
            borderStyle: `solid`,
            width: `30%`,
            display: `inline-block`,
            margin: `0 0 0 0`,
            padding: `0 0 0 0`,
            textAlign: `center`,
            position: `relative`,
            top: `50%`,
            transform: `translateY(-50%)`,
            color: `#ff652f`,
            textAlign: `center`,
            fontSize: `13px`,
            lineHeight: `16px`,
            fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
            textRendering: `optimizeLegibility`,
            

        };

        const greenlazy = {
            color: 'green',
            borderStyle: `solid`,
            width: `30%`,
            display: `inline-block`,
            margin: `0 0 0 0`,
            padding: `0 0 0 0`,
            position: `relative`,
            top: `50%`,
            transform: `translateY(-50%)`,
            color: `#5bc5a7`,
            textAlign: `center`,
            fontSize: `13px`,
            lineHeight: `16px`,
            fontFamily: `'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif !important`,
            textRendering: `optimizeLegibility`,

        };
        return (
                <div className="YOU_OWE column_main" style={{margin: `0px`, padding: `0 0 0 0`}}>
                <div style={{ borderBottom: `1px solid #DDDDDD`, backgroundColor: `#EEEEEE`, display:'flex',
                    fontWeight: `700`, lineHeight: `38px`, fontSize: `24px`, fontFamily: `Lato`, padding: `5% 0 0 5%`,}}>
                    <h1>Dashboard</h1>
                    <AddBills></AddBills>
                    </div>
                <div id="total_balances" style={{
                    backgroundColor: `#EEEEEE`, display: `block`}}>

                        {this.state.allin < 0 ?
                            <div style={red}><span className="blackme">total balance</span>${this.state.allin/100}</div> :
                            <div style={green}><span className="blackme">total balance</span>${this.state.allin/100}</div>
                        }
                        {this.state.owes > 0 ?
                            <div style={red}><span className="blackme">you owe</span>${this.state.owes/100}</div> :
                            <div style={green}><span className="blackme">you owe</span>${this.state.owes/100}</div>
                        }
                        {this.state.owed < 0 ?
                            <div style={redlazy}><span className="blackme">you are owed</span>${this.state.owed/100}</div> :
                            <div style={greenlazy}><span className="blackme">you are owed</span>${this.state.owed/100}</div>
                        }
                        
                    </div>
                        <div style={{display:`flex`, flexWrap:`wrap`}}>
                                <div style={{
                                width: `50%` }}>YOU OWE</div>
                                <div style={{
                                    width: `50%`
                                }}>YOU ARE OWED</div>

                            <div style={{width: `47%`, borderRight: `1px solid gray`, marginLeft: `3%`}}>
                                {
                                    this.props.bills.map(bill =>
                                        (
                                            bill.borrower_id === this.props.current_user_id ? 
                                            <Link to={`/friends/${this.findFriendship(bill.lender)}`} 
                                                    onClick={() => this.props.select(this.findFriendship(bill.lender))}
                                            style={{ textDecoration: `none` }}>
                                                <p key={bill.id} >
                                                    <span>{new Date(bill.created_at).toLocaleDateString("en-US")}<br/>{bill.borrower}
                                                        &nbsp;owes {bill.lender} ${bill.amount / 100}</span>
                                                </p>
                                            </Link>
                                            : null
                                        ))
                                }
                            </div>
                        
                            <div style={{ width: `50%` }}>
                                {
                                    this.props.bills.map(bill =>
                                        (
                                            bill.lender_id === this.props.current_user_id ? 
                                            <Link to={`/friends/${this.findFriendship(bill.borrower)}`} 
                                                    onClick={() => this.props.select(this.findFriendship(bill.borrower))}
                                            className='greyhover' style={{ textDecoration: `none` }}>
                                                <p key={bill.id} >
                                                    <span>{new Date(bill.created_at).toLocaleDateString("en-US")}<br />{bill.borrower}
                                                        &nbsp;owes {bill.lender} ${bill.amount / 100}</span>
                                                </p>
                                            </Link>
                                            : null

                                        ))
                                }
                            </div>
                        </div>
                </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        current_user: state.entities.users[state.session.id],
        current_user_id: state.session.id,
        friends: Object.values(state.entities.friends)
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        openModal: modal => dispatch(openModal(modal)),
        select: friendshipId => dispatch(select(friendshipId))

    }
}

export default connect(mSTP, mDTP)(Bills)


