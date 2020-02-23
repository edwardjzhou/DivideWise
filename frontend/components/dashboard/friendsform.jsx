import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/session_actions'
import { createFriend , fetchFriends } from '../../actions/friend_actions'

class FriendsForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = { 
            selectedFriend: null,
            searchString: '',
        }
        this.renderList = this.renderList.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount(){
        this.props.getUsers()
    }

    update(field) {
        // console.log(this.state)
        return e => this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        let user_one_id
        let user_two_id
        if (this.state.selectedFriend > this.props.current_user_id){
            user_one_id = this.props.current_user_id
            user_two_id = this.state.selectedFriend
        } else if (this.state.selectedFriend < this.props.current_user_id){
            user_two_id = this.props.current_user_id
            user_one_id = this.state.selectedFriend
        }
        

        
        // debounce( () => 
        // {
            this.props.createFriend({
                user_one_id: user_one_id, 
                user_two_id: user_two_id
            })
            this.props.fetchFriends() 
        // }
        // , 50)
    }

    // $.ajax({
    //     method: 'POST',
    //     url: 'api/friendships',
    //     data: { friendship: { user_one_id: 3, user_two_id: 7} }
    // })

    renderList() {
        return this.props.users
            .filter(user => {
                return (user.username.includes(this.state.searchString) || user.email.includes(this.state.searchString) )
            })
            .filter(user => {
                return !this.props.friends.map(friend => friend.friends_name).includes(user.username)
            })
            .map(user => {
                if (this.props.current_user != user ) {
                    return (
                        <li
                        onClick={this.update('selectedFriend')} 
                        value={user.id} key={user.id} tabIndex="-1">{user.username}</li>
                    )
                }
            })
    };

    onChange(e) {
        this.setState({
            searchString: e.target.value
        });
    }

    render(){
        return (
            <div className="addfriend-form">
                <form onSubmit={this.handleSubmit}>
                    Add Friend
                    Search for Friends (by username or email)! : &nbsp;
                        <input
                        type="text"
                        value={this.state.searchString}
                        onChange={this.onChange.bind(this)}
                    />

                    {this.renderList()}
                    <input type="submit" value='Add Friend'/>
                </form>
            </div>
        )
    }
}

const mSTP = (state) => {
    return {
        friends: Object.values(state.entities.friends),
        current_user: state.entities.users[state.session.id],
        current_user_id: state.entities.users[state.session.id].id,
        users: Object.values(state.entities.users),
    }
};

const mDTP = (dispatch) => {
    return {
        createFriend: (friend) => dispatch(createFriend(friend)),
        getUsers: () => dispatch(getUsers()),
        fetchFriends: () => dispatch(fetchFriends()),
    }
};

export default connect(mSTP,mDTP)(FriendsForm)

//https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        let context = this;
        let args = arguments;

        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        let callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};
