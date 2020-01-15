import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import Friends from './friends'
import { logout } from '../../actions/session_actions';
import { getUsers } from '../../actions/session_actions'
import { createFriend } from '../../actions/friend_actions'



class FriendsForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {}
    }

    componentDidMount(){
        this.props.getUsers()
    }

    update(field) {
        return e => (this.setState({
            [field]: e.target.value
        }))
    }

    handleSubmit() {
        // console.log(this.state.selectedFriend)
        // console.log(this.props.current_user_id)
        let user_one_id
        let user_two_id
        if (this.state.selectedFriend > this.props.current_user_id){
            user_one_id = this.props.current_user_id
            user_two_id = this.state.selectedFriend
        } else if (this.state.selectedFriend < this.props.current_user_id){
            user_two_id = this.props.current_user_id
            user_one_id = this.state.selectedFriend
        }
        
        this.props.createFriend({
            user_one_id: user_one_id, 
            user_two_id: user_two_id
        })
    }

    // $.ajax({
    //     method: 'POST',
    //     url: 'api/friendships',
    //     data: { friendship: { user_one_id: 3, user_two_id: 7} }
    // })

    render(){
        return (
            <div className="addfriend-form">
                <form onSubmit={this.handleSubmit}>
                    Add Friend
                    <label> To: 
                        <input type="text" placeholder='choose a username' value={this.state.selectedFriend} />
                            {this.props.users.map(user=>(
                                <li onClick={this.update('selectedFriend')} value={user.id}>{user.username}</li>   
                            ))}
                        <input type="submit" value='Add Friend'/>
                    </label>
                </form>


            </div>
        )
    }
}

const mSTP = (state) => {
    return {
        friends: Object.values(state.entities.friends),
        //user: Object.values(state.entities.users)[0].username,
        current_user: state.entities.users[state.session.id].username,
        current_user_id: state.entities.users[state.session.id].id,
        users: Object.values(state.entities.users)
    }
}

const mDTP = (dispatch) => {
    return {
        createFriend: (friend) => dispatch(createFriend(friend)),
        getUsers: () => dispatch(getUsers()),

    }
}

export default connect(mSTP,mDTP)(FriendsForm)