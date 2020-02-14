import React from 'react';
import { connect } from 'react-redux';
import { createPayment } from '../../actions/bill_actions'
import { Link } from 'react-router-dom';
import { fetchFriends } from '../../actions/friend_actions';
import { closeModal } from '../../actions/modal_actions';


class PaymentsForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: null,
            description: null,
            lender_id: null,
            borrower_id: null,
            settled: false,
            friend: null,
            selfDebtor: false,
        }
        this.selectedFriend = this.selectedFriend.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.update = this.update.bind(this)
        this.theyTheDebtor = this.theyTheDebtor.bind(this)
        this.meTheDebtor = this.meTheDebtor.bind(this)
        

    }

    selectedFriend(e) {
        this.setState({ friend: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()

        this.props.createBill({
            description: this.state.description,
            lender_id: this.state.lender_id,
            borrower_id: this.state.borrower_id,
            amount: this.state.amount * 100,
            settled: this.state.settled,
        })
        // this.props.fetchBills() 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bills != this.props.bills) {
            this.props.closeModal()
        }
        if (prevState.friend != this.state.friend || (prevState.selfDebtor != this.state.selfDebtor && this.state.friend != null)) {
            if (this.state.selfDebtor === true) {
                this.setState({
                    borrower_id: this.props.current_user.id
                })
                if (this.props.current_user.id != this.state.friend.split(',')[0]) {
                    this.setState({
                        lender_id: this.state.friend.split(',')[0]
                    })
                } else if (this.props.current_user.id != this.state.friend.split(',')[1]) {
                    this.setState({
                        lender_id: this.state.friend.split(',')[1]
                    })
                }

            } else if (this.state.selfDebtor === false) {
                this.setState({
                    lender_id: this.props.current_user.id
                })
                if (this.props.current_user.id != this.state.friend.split(',')[0]) {
                    this.setState({
                        borrower_id: this.state.friend.split(',')[0]
                    })
                } else if (this.props.current_user.id != this.state.friend.split(',')[1]) {
                    this.setState({
                        borrower_id: this.state.friend.split(',')[1]
                    })
                }
            }
        }
        console.log(this.state)
    }

    update(field) {
        console.log(this.state)
        return e => this.setState({
            [field]: e.target.value
        })
    }

    theyTheDebtor() {
        this.setState({
            selfDebtor: false
        })
    }

    meTheDebtor() {
        this.setState({
            selfDebtor: true
        })
    }

    allowSubmit() {

        if (this.state.description != null &&
            this.state.lender_id != null &&
            this.state.borrower_id != null &&
            this.state.amount != null) {
            return (<input className='greenbutton' type="submit" value="Save" ></input>)
        } else {
            return (<input className='greenbutton disabled' type="submit" value="Save" disabled="true"></input>)
        }

    }

    render() {

        return (
            <div className="addfriend-form"> <div id="formheader">Settle up</div>
                <form onSubmit={this.handleSubmit}>
                    <span style={{ left: `10px`, position: `absolute` }}>With <span className='STRONG'>you</span> and&nbsp;
                    <select onChange={this.selectedFriend.bind(this)}>
                            <option value={null}>Choose a user</option>
                            {this.props.friends.map(friend => (
                                friend.friends_name !== this.props.current_user ?
                                    <option value={Object.values(friend)} key={friend.id}>{friend.friends_name}</option>
                                    : null)
                            )
                            }
                        </select></span>
                    <br />

                    <div style={{ margin: `5px 33px 5px 33px`, position: 'relative', display: `block` }}>
                        <img src={window.check} style={{ margin: '10px 16px 10px 0', display: `block`, verticalAlign: `middle` }}></img>

                        $<input className="unfocus" onChange={this.update(`amount`)} type='text' style={{
                            width: `40%`, padding: `4px 3px 2px 3px`, display: `inline-block`,
                            fontSize: `40px`, boxShadow: `none`,
                            border: `none`, borderBottom: `1px dashed #CCCCCC`
                        }} placeholder='0.00'></input>
                    </div>

                    <button className='cancel' onClick={this.props.closeModal}>Cancel</button>
                    {this.allowSubmit()}
                </form>
            </div>
        );
    }

}

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        current_user: state.entities.users[state.session.id],
        friends: Object.values(state.entities.friends) //actual users though
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        createBill: (bill) => dispatch(createBill(bill)),
        fetchFriends: () => dispatch(fetchFriends()),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(mSTP, mDTP)(PaymentsForm)


