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
        this.friendsName = this.props.friends[this.props.match.params.friendId].friends_name

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
            <div className="YOU_OWE column_main">
                <AddBills></AddBills>
                {/* <div  style={{ margin: `0px`, padding: `0 0 0 0` }}> */}
                {/* style={{ width: `50%`, marginLeft: `30%`, boxShadow: `-1 0 12px rgba(0, 0, 0, 0.2)` }} */}

                {this.props.friends[this.props.match.params.friendId] === undefined ? "This isn't a valid friendship page or there is trouble fetching friends lists from server" : 
                <div>
                    {this.findFriendId()}
                    {this.findTheBorrowedBills()}
                        <h1>{this.friendsName}</h1>
                    {this.iBorrowed.length===0 ? "There are no bills with this friend yet!" : null}
                    {this.iBorrowed.map( (bill) => {
                        return (<div style={{position:`relative`,borderBottom: `1px solid #eee`, display:`block`,
                            lineheight: `18px`, color: `#333333`, fontSize: `13px`}}>
                            <div style={{cursor:`pointer`, display: `inline-block`, padding: `9px 5px 6px 68px`, position:
                        `relative`, }}>
                                {new Date(bill.created_at).toLocaleDateString("en-US")+" "} 
                                <span> {bill.description+" "}</span>


                            <span>{bill.lender_id==this.props.current_user_id ? "you lent "+bill.amount+"to "+bill.borrower :
                                bill.borrower+ " lent you " + bill.amount } </span>
                            </div>
                                {bill.payments.map( payment=> {
                                        return (
                                        <div style={{ position: `relative`, borderBottom: `1px solid #eee`, display: `block` }}>
                                            <p>
                                                {/* {JSON.stringify(payment)} */}
                                                {Object.values(payment)[0].amount + " "}
                                                {new Date(Object.values(payment)[0].created_at).toLocaleDateString("en-US")}
                                            </p>
                                        </div> )
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