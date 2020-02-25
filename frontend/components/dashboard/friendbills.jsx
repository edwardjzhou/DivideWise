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

    renderNoFriend(){
        return(
            <div>
                {/* <div>"This isn't a valid friendship page or there is trouble fetching friends lists from server" </div> */}
                Whoops – you don't have permission to view this friend or group! Make sure you're logged into the correct Splitwise account. Sorry! :(
            </div>
        )
    }

    renderNoExpensesYet(){
        return(
        <div>
            <div>You have not added any expenses yet
                To add a new expense, click the orange “Add an expense” button.
            </div>
            <img src={window.sorry}></img>
        </div>
        )
    }

    render(){
        return (
            <div className="YOU_OWE column_main" style={{ margin: `0px`, padding: `0 0 0 0` }} >

                {/* <div  style={{ margin: `0px`, padding: `0 0 0 0` }}> */}
                {/* style={{ width: `50%`, marginLeft: `30%`, boxShadow: `-1 0 12px rgba(0, 0, 0, 0.2)` }} */}

                {this.props.friends[this.props.match.params.friendId] === undefined ? this.renderNoFriend()
                : 
                <div>
                    {this.findFriendId()}
                    {this.findTheBorrowedBills()}
                        <div style={{
                            borderBottom: `1px solid #DDDDDD`, backgroundColor: `#EEEEEE`, display: 'flex',
                            justifyContent: `space-between`,
                            fontWeight: `700`, lineHeight: `38px`, fontSize: `24px`, fontFamily: `Lato`, padding: `2.5% 0 2.5% 5%`,
                            
                        }}>
                            <h1 style={{ fontWeight: `700` }}>{this.friendsName}</h1>
                            <AddBills></AddBills>
                        </div>
                        {/* <h1>{this.friendsName}</h1> */}
                    {this.iBorrowed.length===0 ? this.renderNoExpensesYet() : null}
                    {this.iBorrowed.map( (bill) => {
                        return (<div style={{position:`relative`,borderBottom: `1px solid #eee`, display:`block`,
                            lineheight: `18px`, color: `#333333`, fontSize: `13px`}}>
                            <div style={{cursor:`pointer`, display: `inline-block`, padding: `9px 5px 6px 68px`, position:
                        `relative`, }}>
                                {new Date(bill.created_at).toLocaleDateString("en-US")+" "} 
                                <img src={window.check} style={{
                                 width: `auto`, height:`100%`, margin: '10px 16px 10px 0', display: `inline-block`, verticalAlign: `middle` }}></img>

                                <span> {bill.description+" "}</span>


                            <span>{bill.lender_id==this.props.current_user_id ? "you lent $"+bill.amount/100+" to "+bill.borrower :
                                bill.borrower+ " lent you $" + bill.amount/100 } </span>
                            </div>
                                {/* PAYMENTS HERE */}
                                {bill.payments != undefined && bill.payments.length != 0 ? bill.payments.map( payment=> {
                                        return (
                                        <div style={{ position: `relative`, borderBottom: `1px solid #eee`, display: `block` }}>
                                            <p> <img src={window.payment}></img>
                                                {/* {JSON.stringify(payment)} */}
                                                {Object.values(payment)[0].amount + " "}
                                                {new Date(Object.values(payment)[0].created_at).toLocaleDateString("en-US")}
                                            </p>
                                        </div> )
                                    }
                                ): null }

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