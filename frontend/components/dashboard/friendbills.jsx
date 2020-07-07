import React from "react";
import { connect } from "react-redux";
import { Link, match } from "react-router-dom";

import AddBills from "./buttons/addbills";
import Comments from "./comments/comments";
import Payments from "./payments";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { fetchFriends } from "../../actions/friend_actions";
import { openModal } from "../../actions/modal_actions";
import { expandSection, handleDropdown, collapseSection } from "../animations/dropdown";

class Friendbills extends React.Component {
  constructor(props, { match }) {
    super(props);
    this.state = {
      visibleBills: {},
    };
    this.findTheBorrowedBills = this.findTheBorrowedBills.bind(this);
    this.findFriendId = this.findFriendId.bind(this);
    this.iBorrowed = [];
    this.dontHandleDropdown = this.dontHandleDropdown.bind(this);
  }

  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchBills();
  }

  componentDidUpdate(prevProps, prevState) {
    //this technically is default behavior
    if (prevProps.bills !== this.props.bills) {
      this.forceUpdate();
    }
  }

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
        <div>
          <h2 style={{ textOverflow: `initial`, fontWeight: `700` }}>
            You have not added any expenses yet
          </h2>
          <p>To add a new expense, click the orange “Add an expense” button.</p>
        </div>
      </div>
    );
  }

  dontHandleDropdown(e) {
    e.stopPropagation();
  }

  renderBill(bill) {
    return (
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
          {new Date(bill.created_at).toLocaleDateString("en-US") + " "}
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
    );
  }

  render() {
    return (
      // className for styled div classes passed in as props
      <div className={this.props.className}>
        {/* topbar that's gray with 2 buttons */}
        {this.props.friends[this.props.match.params.friendId] === undefined ? (
          this.renderNoFriend()
        ) : (
          <div>
            {this.findFriendId()}
            {this.findTheBorrowedBills()}
            <div
              style={{
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
              <AddBills />
            </div>
            {/* end topbar that's gray with 2 buttons */}
            {/* 2 open divs */}

            {/* START BILLS LIST  */}
            {this.iBorrowed.length === 0 ? this.renderNoExpensesYet() : null}
            {this.iBorrowed.map((bill) => {
              return (
                <div
                  onClick={handleDropdown}
                  id={`${bill.id}`}
                  key={`BILL->${bill.id}`}
                  style={{
                    backgroundColor: ``,
                    position: `relative`,
                    borderBottom: `1px solid #eee`,
                    display: `block`,
                    lineheight: `18px`,
                    color: `#333333`,
                    fontSize: `13px`,
                    overflow: `hidden`,
                  }}
                >
                  {this.renderBill(bill)}

                  {/* comments and payment wrapper div */}

                  {/* flex-direction: row - flex items will align horizontally
                  justify-content: flex-start - flex items will stack at the start of the line on the main axis
                  align-items: stretch - flex items will expand to cover the cross-size of the container
                  flex-wrap: nowrap - flex items are forced to stay in a single line
                  flex-shrink: 1 - a flex item is allowed to shrink */}
                  <div
                    id={`comments${bill.id}`}
                    onClick={this.dontHandleDropdown}
                    data-collapsed
                    className="section collapsible"
                    style={{
                      height: `0px`,
                      display: `flex`,
                      flexWrap: `nowrap`,
                      transition: `height 0.5s ease-out`,
                    }}
                  >
                    <Payments
                      bill={bill}
                      style={{
                        width: `50%`,
                        backgroundColor: `pink`,
                        wordWrap: `break-word`,
                      }}
                      current_user_id={this.props.current_user_id}
                      current_user={this.props.current_user}
                    />

                    <Comments billId={bill.id} style={{ width: `50%` }} />
                  </div>
                </div>
              );
            })}
            {/*  END BILLS */}

            {/* END friends */}
          </div>
        )}
      </div>
    );
  }
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

