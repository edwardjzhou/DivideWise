import React from 'react';
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from 'react-redux';
import { fetchBills, fetchBill} from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import Friends from './friends'
import { logout } from '../../actions/session_actions';
import Bills from './bills'




class Dashboard extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchBills()
    }

    render() {
        return (
            <div className="row">
                <div id="dashboardnavbar"> DIVIDEWISE:  
                    <div><a id="dropdown">{this.props.current_user} dropdown logout here  </a>
                    <button className="header-button" onClick={this.props.logout}>Log Out</button></div>
                </div>
                    <Friends /> 
                    <Bills/>
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        // user: Object.values(state.entities.users)[0].username,
        current_user: state.entities.users[state.session.id].username,
        // currentUser: session.currentUser

    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        logout: () => dispatch(logout()),

    }
}

export default connect(mSTP, mDTP)(Dashboard)