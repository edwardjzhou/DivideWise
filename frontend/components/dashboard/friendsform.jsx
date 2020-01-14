import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import Friends from './friends'
import { logout } from '../../actions/session_actions';


class FriendsForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    update(field) {
        return e => (this.setState({
            [field]: e.currentTarget.value
        }))
    }

    handleSubmit() {
        this.props.action(this.state)
    }

    render(){
        return (
            <div className="addfriend-form">
                <form>
                    Add Friend
                    <label> To: 
                        <input type="text" placeholder='enter username'></input>
                        <input type="submit" value='Add Friend'/>
                    </label>
                </form>


            </div>
        )
    }
}

export default FriendsForm