import React from "react";
import { connect } from "react-redux";
import { createBill, fetchBill, fetchBills } from "../../actions/bill_actions";
import { Link } from "react-router-dom";
import { fetchFriends } from "../../actions/friend_actions";
import { closeModal } from "../../actions/modal_actions";

class BillsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      description: null,
      lender_id: null,
      borrower_id: null,
      settled: false,
      friend: null,
      selfDebtor: false,
    };
    this.selectedFriend = this.selectedFriend.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.theyTheDebtor = this.theyTheDebtor.bind(this);
    this.meTheDebtor = this.meTheDebtor.bind(this);
  }

  componentDidMount() {}

  // componentWillUnmount(){
  //     // this.props.fetchBills()
  // }

  selectedFriend(e) {
    this.setState({ friend: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.createBill({
      description: this.state.description,
      lender_id: this.state.lender_id,
      borrower_id: this.state.borrower_id,
      amount: this.state.amount * 100,
      settled: this.state.settled,
    });
    // this.props.fetchBills()
    setTimeout(this.props.fetchBills, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      Object.values(prevProps.bills).length <
      Object.values(this.props.bills).length
    ) {
      this.props.closeModal();
    }
    if (
      prevState.friend != this.state.friend ||
      (prevState.selfDebtor != this.state.selfDebtor &&
        this.state.friend != null)
    ) {
      if (this.state.selfDebtor === true) {
        this.setState({
          borrower_id: this.props.current_user.id,
        });
        if (this.props.current_user.id != this.state.friend.split(",")[0]) {
          this.setState({
            lender_id: this.state.friend.split(",")[0],
          });
        } else if (
          this.props.current_user.id != this.state.friend.split(",")[1]
        ) {
          this.setState({
            lender_id: this.state.friend.split(",")[1],
          });
        }
      } else if (this.state.selfDebtor === false) {
        this.setState({
          lender_id: this.props.current_user.id,
        });
        if (this.props.current_user.id != this.state.friend.split(",")[0]) {
          this.setState({
            borrower_id: this.state.friend.split(",")[0],
          });
        } else if (
          this.props.current_user.id != this.state.friend.split(",")[1]
        ) {
          this.setState({
            borrower_id: this.state.friend.split(",")[1],
          });
        }
      }
    }
    // this.props.fetchBills()

    // console.log(this.state)
  }

  update(field) {
    // console.log(this.state)
    return (e) =>
      this.setState({
        [field]: e.target.value,
      });
  }

  theyTheDebtor() {
    this.setState({
      selfDebtor: false,
    });
  }

  meTheDebtor() {
    this.setState({
      selfDebtor: true,
    });
  }

  allowSubmit() {
    if (
      this.state.description != null &&
      this.state.lender_id != null &&
      this.state.borrower_id != null &&
      this.state.amount != null &&
      !isNaN(this.state.amount)
    ) {
      return <input className="greenbutton" type="submit" value="Save"></input>;
    } else {
      return (
        <input
          className="greenbutton disabled"
          type="submit"
          value="Save"
          disabled="true"
        ></input>
      );
    }
  }

  render() {
    return (
      <div className="addfriend-form">
        {" "}
        <div id="formheader">Add an Expense</div>
        <form onSubmit={this.handleSubmit}>
          <div
            style={{
              height: `32px`,
              left: `20px`,
              borderBottom: `1px solid #EEEEEE`,
              width: `100%`,
              padding: `4px 4px 4px 4px`,
            }}
          >
            With <span className="STRONG">you</span> and&nbsp;
            <select onChange={this.selectedFriend.bind(this)}>
              <option value={null}>Choose a friend</option>
              {this.props.friends.map((friend) =>
                friend.friends_name !== this.props.current_user ? (
                  <option value={Object.values(friend)} key={friend.id}>
                    {friend.friends_name}
                  </option>
                ) : null
              )}
            </select>
          </div>
          <br />

          <div
            style={{
              margin: `5px 33px 5px 33px`,
              position: "relative",
              display: `flex`,
              height: `200px`,
            }}
          >
            <img
              src={window.check}
              style={{
                margin: "50px 16px 10px 0",
                display: `block`,
                verticalAlign: `middle`,
                padding: `0 0 0 0`,
                width: `64px`,
                height: `64px`,
              }}
            ></img>

            <div
              style={{
                display: `flexbox`,
                flexDirection: `column`,
                padding: `30px`,
              }}
            >
              <input
                className="unfocus"
                onChange={this.update(`description`)}
                type="text"
                style={{
                  height: `50%`,
                  width: `83%`,
                  padding: `0px 0px 0px 0px`,
                  display: `block`,
                  fontSize: `25px`,
                  boxShadow: `none`,
                  border: `none`,
                  borderBottom: `1px dashed #CCCCCC`,
                }}
                placeholder="Enter a description"
              ></input>
              <div
                style={{
                  display: `inline-block`,
                  verticalAlign: `bottom`,
                  position: `relative`,
                }}
              >
                <span
                  style={{
                    position: `relative`,
                    bottom: `0`,
                    left: `0`,
                    borderBottom: `1px dashed #CCCCCC`,
                    verticalAlign: `bottom`,
                  }}
                >
                  $
                </span>

                <input
                  className="unfocus"
                  onChange={this.update(`amount`)}
                  type="text"
                  style={{
                    width: `80%`,
                    padding: `4px 3px 2px 3px`,
                    display: `inline-block`,
                    fontSize: `40px`,
                    boxShadow: `none`,
                    border: `none`,
                    borderBottom: `1px dashed #CCCCCC`,
                  }}
                  placeholder="0.00"
                ></input>
              </div>
            </div>
          </div>

          {this.state.selfDebtor === false ? (
            <p
              className="centerme"
              onClick={() => this.meTheDebtor()}
              style={{ borderBottom: `1px solid #EEEEEE` }}
            >
              {" "}
              Paid by <span className="STRONG graycircle">YOU</span>
              <br />
              (so he/she owes you ${this.state.amount ? this.state.amount : 0.0}
              )
            </p>
          ) : (
            <p
              className="centerme"
              onClick={() => this.theyTheDebtor()}
              style={{ borderBottom: `1px solid #EEEEEE` }}
            >
              {" "}
              Paid by{" "}
              <span className="STRONG graycircle" style={{ width: `auto` }}>
                FRIEND
              </span>
              <br />
              (so you owe him/her ${this.state.amount ? this.state.amount : 0.0}
              )
            </p>
          )}

          <div
            style={{
              margin: `1vh`,
              display: `flex`,
              justifyContent: `flex-end`,
            }}
          >
            <button className="cancel" onClick={this.props.closeModal}>
              Cancel
            </button>
            &nbsp;
            {this.allowSubmit()}
          </div>
        </form>
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    bills: Object.values(state.entities.bills),
    current_user: state.entities.users[state.session.id],
    friends: Object.values(state.entities.friends), //actual users though
  };
};

const mDTP = (dispatch) => {
  return {
    fetchBills: () => dispatch(fetchBills()),
    createBill: (bill) => dispatch(createBill(bill)),
    fetchFriends: () => dispatch(fetchFriends()),
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mSTP, mDTP)(BillsForm);
