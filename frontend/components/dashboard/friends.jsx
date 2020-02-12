import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions';
import { Link } from 'react-router-dom';
import { openModal, closeModal } from '../../actions/modal_actions';
import AddFriends from './addfriends';
import { fetchFriends } from '../../actions/friend_actions';


class Friends extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.fetchFriends()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.friends !== this.props.friends) {
            console.log('friends props has changed.')
            this.forceUpdate()
        }
    }

    render() {

        return (
            <div id="friends_bar" className="column">
                <div>
                <div className="header"> FRIENDS<AddFriends></AddFriends></div>
                {this.props.friends.map(friend => (
                    friend.friends_name !==  this.props.current_user ?
                         (<div className='friendItem' tabIndex="-1" key={friend.id}>
                            <img height="25" src={window.user} ></img>
                             {friend.friends_name}</div>)
                        : null) 
                    )
                }
                    <br></br>             
                    </div>
            </div>
        );
    }
}


const mSTP = (state) => {
    return {
        friends: Object.values(state.entities.friends),
        //user: Object.values(state.entities.users)[0].username,
        current_user: state.entities.users[state.session.id].username
    }
}

const mDTP = (dispatch) => {
    return {
        // processForm: (user) => dispatch(signup(user)),
        //  otherForm: (
        //     <button onClick={() => dispatch(openModal('Add'))}>
        //         Login
        //     </button>
        // ),
        closeModal: () => dispatch(closeModal()),

        fetchFriends: () => dispatch(fetchFriends()),

    }
}

export default connect(mSTP, mDTP)(Friends)