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

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bills !== this.props.bills) {
            this.forceUpdate()
        }
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
        <div style={{display: `flex`, marginLeft: `10%`, marginTop: `10%`, marginRight: `50px`}}>
            <img style={{ display: `inline-block` }} src={window.sorry}></img>

            <p style={{display: `inline-block`, }}>
                    <h2 style={{ textOverflow: `initial`, fontWeight:`700`}}>You have not added any expenses yet</h2>
                    <p>To add a new expense, click the orange “Add an expense” button.</p>
            </p>
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
                            <div style={{cursor:`pointer`, display: `flex`, padding: `9px 5px 6px 10px`, position:
                        `relative`, justifyContent: `space-between`, marginLeft: `20px`, marginRight: `50px`}}>
                                <div>{new Date(bill.created_at).toLocaleDateString("en-US")+" "} 
                                <img src={window.check} style={{
                                 width: `35px`, height:`35px`, margin: '10px 16px 10px 0', display: `inline-block`, verticalAlign: `middle` }}></img>

                                <div className="friendbills">{bill.description}</div>
                                    </div>
                                <div style={{display: `inline-block`, paddingLeft: `0`}}>
                                    <div>{bill.lender_id==this.props.current_user_id ? 
                                            "you lent " + bill.borrower  :
                                            bill.lender + " lent you"} </div> 
                                            <div>${bill.amount/100}</div>
                                    </div>
                                </div>
                                {/* PAYMENTS HERE */}
                                {bill.payments != undefined && bill.payments.length != 0 ? bill.payments.map( payment=> {
                                        return (
                                        <div style={{ position: `relative`, borderBottom: `1px solid #eee`, display: `block` }}>
                                                <div style={{
                                                    cursor: `pointer`, display: `flex`, padding: `9px 5px 6px 10px`, position:
                                                        `relative`, justifyContent: `space-between`, marginLeft: ``, marginRight: `50px`
                                                }} >
                                                     <div><img height="19px" width="19px" style={{margin: `0 0 0 0`}} src={window.payment}></img>
                                                        {/* {JSON.stringify(payment)} */}
                                                        {new Date(Object.values(payment)[0].created_at).toLocaleDateString("en-US")}
                                                        {Object.values(payment)[0].payer_id == this.props.current_user_id ?
                                                        this.props.current_user.username + " paid " + bill.lender :
                                                        bill.borrower + " paid " + this.props.current_user.username}
                                                    ${Object.values(payment)[0].amount + " " / 100}
                                                    </div>
                                                <div style={{ display: ``, paddingLeft: `0` }}>
                                                        {Object.values(payment)[0].payer_id  == this.props.current_user_id ?
                                                        "you paid ":
                                                            "you received " } 
                                                        ${Object.values(payment)[0].amount + " " / 100}
                                                </div>


                                                
                                            </div>
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