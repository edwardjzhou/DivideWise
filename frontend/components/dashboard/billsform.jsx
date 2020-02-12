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
            friendId: null,

        }
        this.selectedFriend = this.selectedFriend.bind(this);
    }

    componentDidMount() {
        this.props.fetchBills()
        // setTimeout(() => this.calculateTotalYouOwe(), 200)
        // // this.calculateTotalYouOwe()
    }

    selectedFriend(friendId){
        this.setState({friendId: friendId})
        console.log(this.state)
    }



    render() {

        return (
            <div> bills form 
                <form>
                {this.state.friendId}
                <select onChange={()=>this.selectedFriend(this.value)}>
                        {this.props.friends.map(friend => (
                            friend.friends_name !== this.props.current_user ?
                                <option value={friend.id} key={friend.id}>{friend.friends_name}</option>
                                : null)
                        )
                        }
                </select>
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
        createBill: (bill) => dispatch(createBill()),
        fetchFriends: () => dispatch(fetchFriends()),
    }
}

export default connect(mSTP, mDTP)(BillsForm)


