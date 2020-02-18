import React from 'react';
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link, match } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import AddBills from './addbills';


class Friendbills extends React.Component {
    constructor(props, {match}) {
        super(props)
        this.state = {
        }
        console.log(this.props.match.params.friendId)
    }

    componentDidMount() {
        this.props.fetchBills()
    }

    render(){
        return (
            <div style={{width: `50%`, marginLeft: `30%`}}>
                FRIEND BILLS 
                <AddBills></AddBills>
            </div>
        )
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        current_user: state.entities.users[state.session.id],
        current_user_id: state.session.id
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        openModal: modal => dispatch(openModal(modal))

    }
}

export default connect(mSTP, mDTP)(Friendbills)


