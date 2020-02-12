import React from 'react';
import { connect } from 'react-redux';
import { createBill, fetchBill, fetchBills } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { fetchFriends } from '../../actions/friend_actions';


class BillsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: null,
            description: null,
            lender_id: null,
            borrower_id: null,
            settled: null,
            friend: null,

        }
        this.selectedFriend = this.selectedFriend.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        // this.props.fetchBills()

    }

    selectedFriend(e){
        this.setState({friend: e.target.value})
        // console.log(this.state)
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.createBill({
            description: 'descriplmao',
            lender_id: `60`, 
            borrower_id: `1`,
            amount: `500`,
            settled: `false`,
        })
        // this.props.fetchBills() 
    }

    update(field) {
        console.log(this.state)
        return e => this.setState({
            [field]: e.target.value
        })
    }

    render() {

        return (
            <div className="addfriend-form"> Add an Expense
                <form onSubmit={this.handleSubmit}>
                With you and&nbsp;
                <select onChange={this.selectedFriend.bind(this)}>
                        {this.props.friends.map(friend => (
                            friend.friends_name !== this.props.current_user ?
                                <option value={Object.values(friend)} key={friend.id}>{friend.friends_name}</option>
                                : null)
                        )
                        }
                </select>
                    <br />
                <img src={window.check}></img>
                <input type='text' style={{height:`24px`, width:`180px`, padding:`4px 3px 2px 3px`, display: `inline-block`,
                        fontSize: `20px`,  boxShadow: `none`,
                        border: `none`, borderBottom: `1px dashed #CCCCCC`}} placeholder='Enter a description'></input>
                <input type="submit" value="Save"></input>
                </form>
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        // bills: Object.values(state.entities.bills),
        current_user: state.entities.users[state.session.id],
        friends: Object.values(state.entities.friends) //actual users though
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        // openModal: modal => dispatch(openModal(modal))
        createBill: (bill) => dispatch(createBill(bill)),
        fetchFriends: () => dispatch(fetchFriends()),
    }
}

export default connect(mSTP, mDTP)(BillsForm)


