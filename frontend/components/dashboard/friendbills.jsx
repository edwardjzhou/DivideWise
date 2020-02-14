import React from 'react';
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import AddBills from './addbills';


class Friendbills extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.fetchBills()
    }

    render(){
        return (
            <div style={{width: `50%`, marginLeft: `30%`}}>
                asdf
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


