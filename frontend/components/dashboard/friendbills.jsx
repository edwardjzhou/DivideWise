import React from 'react';
import { connect } from 'react-redux';
import { fetchBills, fetchBill } from '../../actions/bill_actions'
import { Link, match } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';
import AddBills from './addbills';
import { fetchFriends } from '../../actions/friend_actions';


class Friendbills extends React.Component {
    constructor(props, {match}) {
        super(props)
        this.state = {
        }
        // console.log(this.props.match.params.friendId)

        this.findTheBorrowedBills = this.findTheBorrowedBills.bind(this)
        this.findFriendId = this.findFriendId.bind(this)
        this.iBorrowed = []

    }

    componentDidMount() {
        this.props.fetchFriends()
        this.props.fetchBills()
    }

    findFriendId(){
        if (this.props.friends[this.props.match.params.friendId].user_one_id != this.props.current_user_id){
            this.friendUserId = this.props.friends[this.props.match.params.friendId].user_one_id
        }else{
            this.friendUserId = this.props.friends[this.props.match.params.friendId].user_two_id
        }
        // return this.friendUserId
        return null
    }

    findTheBorrowedBills(){
        let answer = [] 
        for(let key in this.props.bills){
            if(this.props.bills[key].lender_id==this.friendUserId ||
                this.props.bills[key].borrower_id == this.friendUserId ){
                answer.push(this.props.bills[key])   
            }
        }
        
        this.iBorrowed = answer
        return null
        
    }

    render(){
        return (
            <div style={{ width: `50%`, marginLeft: `30%`, boxShadow: `5px 10px`}}>
                <AddBills></AddBills>
                
                {this.props.friends[this.props.match.params.friendId] === undefined ? "STILL LOADING" : 
                <div>
                    "FRIEND BILLS "
                    {this.findFriendId()}
                    {this.findTheBorrowedBills()}
                    {this.iBorrowed.map( (bill) => {
                        return (<div>
                            <p>{new Date(bill.created_at).toLocaleDateString("en-US")+" "+ bill.description+" "}</p>
                                {bill.payments.map( payment=> {
                                        return (
                                        <p>{JSON.stringify(payment)}
                                        
                                        
                                        </p>)
                                    }
                                )}
                        </div>)
                    })
                    }
                  
                </div>
                }
          </div>
        )
    }

}

{/* {this.findFriendId()} */ }
{/* {this.findTheBillsFirst()}   */ }
{/* {console.log(this.props.friends)} */ }
{/* {console.log(this.props.match.params.friendId)} */ }

const mSTP = (state) => {
    return {
        bills: Object.values(state.entities.bills),
        friends: state.entities.friends,
        current_user: state.entities.users[state.session.id],
        current_user_id: state.session.id
    }
}

const mDTP = (dispatch) => {
    return {
        fetchBills: () => dispatch(fetchBills()),
        openModal: modal => dispatch(openModal(modal)),
        fetchFriends: () => dispatch(fetchFriends()),

    }
}

export default connect(mSTP, mDTP)(Friendbills)


