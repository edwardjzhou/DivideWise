import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { createBill, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
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
        this.props.fetchFriends()
        // setTimeout(() => this.calculateTotalYouOwe(), 200)
        // // this.calculateTotalYouOwe()
    }

    selectedFriend(friendId){
        this.state.friendId = friendId
    }



    render() {

        return (
            <div> bills form 
                <form>
                {this.state.friendId}
                <select onChange={this.selectedFriend(this.value)}>
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
        // fetchBills: () => dispatch(fetchBills()),
        // openModal: modal => dispatch(openModal(modal))
        createBill: (bill) => dispatch(createBill()),
        fetchFriends: () => dispatch(fetchFriends()),
    }
}

export default connect(mSTP, mDTP)(BillsForm)


