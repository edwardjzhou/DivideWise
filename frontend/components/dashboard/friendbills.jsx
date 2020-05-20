// note to self: forceUpdate only re-renders own component NOT all mounted components
import React from "react";
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { Link, match } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";
import AddBills from "./addbills";
import { fetchFriends } from "../../actions/friend_actions";
import Comments from './comments';

class Friendbills extends React.Component {
  constructor(props, { match }) {
    super(props);
    this.state = {
      visibleBills: {}
    };
    this.findTheBorrowedBills = this.findTheBorrowedBills.bind(this);
    this.findFriendId = this.findFriendId.bind(this);
    this.iBorrowed = [];
    
    this.handleVisibility = this.handleVisibility.bind(this);
    
  }

  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchBills();
  }

  componentDidUpdate(prevProps, prevState) { //this technically is default behavior
    if (prevProps.bills !== this.props.bills) {
      this.forceUpdate();
    }
  }
  //componentwillreceiveprops can make sure if props are different i can make it NOT render

  findFriendId() {
    if (
      this.props.friends[this.props.match.params.friendId].user_one_id !=
      this.props.current_user_id
    ) {
      this.friendUserId = this.props.friends[
        this.props.match.params.friendId
      ].user_one_id;
    } else {
      this.friendUserId = this.props.friends[
        this.props.match.params.friendId
      ].user_two_id;
    }
    this.friendsName = this.props.friends[
      this.props.match.params.friendId
    ].friends_name;

  }

  findTheBorrowedBills() {
    let answer = [];
    for (let key in this.props.bills) {
      if (
        this.props.bills[key].lender_id == this.friendUserId ||
        this.props.bills[key].borrower_id == this.friendUserId
      ) {
        answer.push(this.props.bills[key]);
      }
    }
    this.iBorrowed = answer;
  }

  renderNoFriend() {
    return (
      <div>
        {/* <div>"This isn't a valid friendship page or there is trouble fetching friends lists from server" </div> */}
        Whoops – you don't have permission to view this friend or group! Make
        sure you're logged into the correct Dividewise account. Sorry! :(
      </div>
    );
  }

  renderNoExpensesYet() {
    return (
      <div
        style={{
          display: `flex`,
          marginLeft: `10%`,
          marginTop: `10%`,
          marginRight: `50px`,
        }}
      >
        <img style={{ display: `inline-block` }} src={window.sorry}></img>

        <p style={{ display: `inline-block` }}>
          <h2 style={{ textOverflow: `initial`, fontWeight: `700` }}>
            You have not added any expenses yet
          </h2>
          <p>To add a new expense, click the orange “Add an expense” button.</p>
        </p>
      </div>
    );
  }

  handleVisibility(billId){
    // experimenting with OBJECT STATE variables
    // no non null assertions in obejcts??
    // re: state merging
    // The merging is shallow, so this.setState({ comments }) leaves this.state.posts intact, but completely replaces this.state.comments.


    let newVisibility = !this.state.visibleBills[`${billId}`]
    // problems with mutating state FOUND OUT best practice is to just use prevState in a CB that returns a new obj {state.property: function of prevstate } 
    this.setState( (prevState) => ({
      visibleBills: {                   // state object that we want to update
        ...prevState.visibleBills,    // keep all other key-value pairs
        [billId]: newVisibility     // update the value of specific key
      },
      // newguy: 5 // can add in new this.state.PROPERTY anytime with setstate

    }))
    // this.setState( { visibleBills: newObject } )
    console.log(this.state)
  }

  render() {
    return (
      <div
        className="YOU_OWE column_main"
        style={{ margin: `0px`, padding: `0px` }}
      >


        {this.props.friends[this.props.match.params.friendId] === undefined ? (
          this.renderNoFriend()
        ) : (
          <div>
            {this.findFriendId()}
            {this.findTheBorrowedBills()}
            <div
              style={{
                borderBottom: `1px solid #DDDDDD`,
                backgroundColor: `#EEEEEE`,
                display: "flex",
                justifyContent: `space-between`,
                fontWeight: `700`,
                lineHeight: `38px`,
                fontSize: `24px`,
                fontFamily: `Lato`,
                padding: `2.5% 0 2.5% 5%`,
              }}
            >
              <h1 style={{ fontWeight: `700` }}>{this.friendsName}</h1>
              <AddBills></AddBills>
            </div>

              {/* START BILLS LIST  */}
            {this.iBorrowed.length === 0 ? this.renderNoExpensesYet() : null}
            {this.iBorrowed.map((bill) => {
              return (
                <div
                // ON CLICK SET THE CLICKED ON BILL TO SHOW ITS COMMENTS
                  onClick = { () => this.handleVisibility(bill.id)}  // i think it creates a new anon function / bill so it would be better if i had a separate method for this
                  // ON CLICK SET THE CLICKED ON BILL TO SHOW ITS COMMENTS

                  key= {`BILL->${bill.id}`}
                  style={{
                    backgroundColor: ``,
                    position: `relative`,
                    borderBottom: `1px solid #eee`,
                    display: `block`,
                    lineheight: `18px`,
                    color: `#333333`,
                    fontSize: `13px`,
                    overflow:`hidden`
                  }}
                >
                  <div
                    style={{
                      cursor: `pointer`,
                      display: `flex`,
                      padding: `9px 5px 6px 10px`,
                      position: `relative`,
                      justifyContent: `space-between`,
                      marginLeft: `20px`,
                      marginRight: `50px`,
                    }}
                  >
                    <div>
                      {new Date(bill.created_at).toLocaleDateString("en-US") +
                        " "}
                      <img
                        src={window.check}
                        style={{
                          width: `35px`,
                          height: `35px`,
                          margin: "10px 16px 10px 0",
                          display: `inline-block`,
                          verticalAlign: `middle`,
                        }}
                      ></img>

                      <div className="friendbills">{bill.description}</div>
                    </div>
                    <div style={{ display: `inline-block`, paddingLeft: `0` }}>
                      <div>
                        {bill.lender_id == this.props.current_user_id
                          ? "you lent " + bill.borrower
                          : bill.lender + " lent you"}{" "}
                      </div>
                      <div>${bill.amount / 100}</div>
                    </div>
                 
                  </div>
                  {/* COMMENTS COMPONENT RENDERED HERE */}

                  <Comments billId={bill.id} isVisible={false || this.state.visibleBills[bill.id]} />

                  {/* COMMENTS COMPONENT RENDERED HERE */}

                  {/* END BILL */}


                  {/* PAYMENTS HERE */}
                  {bill.payments != undefined && bill.payments.length != 0
                    ? bill.payments.map((payment) => {
                        return (
                          <div
                          key= {`PAYMENT->${payment.id}`}
                            style={{
                              position: `relative`,
                              borderBottom: `1px solid #eee`,
                              display: `block`,
                            }}
                          >
                            <div
                              style={{
                                cursor: `pointer`,
                                display: `flex`,
                                padding: `9px 5px 6px 9px`,
                                position: `relative`,
                                justifyContent: `space-between`,
                                marginLeft: ``,
                                marginRight: `50px`,
                              }}
                            >

                              <div style={{ display: `flex` }}>
                                
                                <img
                                  height="19px"
                                  width="19px"
                                  style={{ margin: `0 0 0 0` }}
                                  src={window.payment}
                                />
                                &nbsp;
                                
                                <div>
                                  {new Date(
                                    Object.values(payment)[0].created_at
                                  ).toLocaleDateString("en-US")}
                                </div>

                                <div style={{ minWidth: "51px" }}> &nbsp;</div>

                                {Object.values(payment)[0].payer_id ==
                                this.props.current_user_id
                                  ? this.props.current_user.username +
                                    " paid " +
                                    bill.lender
                                  : bill.borrower +
                                    " paid " +
                                    this.props.current_user.username}
                                ${Object.values(payment)[0].amount / 100 + " "}

                              </div>

                              <div style={{ display: ``, paddingLeft: `0` }}>
                                {Object.values(payment)[0].payer_id ==
                                this.props.current_user_id
                                  ? "you paid "
                                  : "you received "}
                                ${Object.values(payment)[0].amount / 100 + " "}
                              </div>

                            </div>

                          

                          </div>

                        );
                      }) 

                    : null}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

{
  /* {this.findFriendId()} */
}
{
  /* {this.findTheBillsFirst()}   */
}
{
  /* {console.log(this.props.friends)} */
}
{
  /* {console.log(this.props.match.params.friendId)} */
}

const mSTP = (state) => {
  return {
    bills: Object.values(state.entities.bills),
    friends: state.entities.friends,
    current_user: state.entities.users[state.session.id],
    current_user_id: state.session.id,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchBills: () => dispatch(fetchBills()),
    openModal: (modal) => dispatch(openModal(modal)),
    fetchFriends: () => dispatch(fetchFriends()),
  };
};

export default connect(mSTP, mDTP)(Friendbills);
