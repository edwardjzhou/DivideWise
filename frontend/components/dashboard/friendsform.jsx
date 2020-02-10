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
        this.state = { selectedFriend: null}
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
        
        this.forceUpdate()
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
                    {/* <label> To:  */}


                        <input type="text" placeholder='choose a username' value={this.props.users[this.state.selectedFriend] === undefined ?
                            null : 
                            this.props.users[this.state.selectedFriend].username 
                        } />

{/*                         
                        {this.props.users[this.state.selectedFriend] === undefined ?
                            null :
                            this.props.users[this.state.selectedFriend].username
                        } */}

{/* name="listbox" */}
                        {/* https://www.jondjones.com/frontend/react/components/how-to-build-a-filterable-search-bar-in-react */}
                        <select  size="10">
                            {this.props.users.map(user=>(
                                <option onClick={this.update('selectedFriend')} value={user.id} key={user.id}>{user.username}</option>   
                            ))}
                        </select>
                        <input type="submit" value='Add Friend'/>
                    {/* </label> */}
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