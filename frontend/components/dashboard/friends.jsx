import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { openModal, closeModal } from "../../actions/modal_actions";
import AddFriends from "./buttons/addfriends";
import { fetchFriends } from "../../actions/friend_actions";
import { select } from "../../actions/ui_actions";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchFriends();
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.friends !== this.props.friends ||
      prevProps.selectedFriendshipid !== this.props.selectedFriendshipid
    ) {
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={{ marginRight: `10px`, marginTop: `10px` }}
      >
        <div className="greyhover">
          {location.href.includes("dashboard") ? (
            <Link
              to="/"
              style={{
                color: `#5BC5A7`,
                fontSize: `1.1rem`,
                fontWeight: `bold`,
                borderLeft: `8px solid #5BC5A7`,
                textDecoration: `none`,
                boxSizing: `content-box`,
                display: `block`,
              }}
            >
              <img src={window.logoURL} height="20px"></img>
              Dashboard
            </Link>
          ) : (
            <Link
              to="/"
              style={{
                textDecoration: `none`,
                color: "gray",
                fontSize: "1.1rem",
                fontWeight: `bold`,
                boxSizing: `content-box`,
                display: `block`,
                borderLeft: `8px solid white`,
              }}
            >
              <img src={window.logoURL} height="20px"></img>
              Dashboard
            </Link>
          )}
        </div>

        <div className="header">
          FRIENDS
          <AddFriends />
        </div>

        {this.props.friends.map((friend) =>
          friend.friends_name !== this.props.current_user ? (
            this.props.selectedFriendshipid == friend.id &&
            !this.props.location.pathname.includes("dashboard") &&
            this.props.location.pathname.split("/")[
              this.props.location.pathname.split("/").length - 1
            ] == friend.id ? (
              <div className="greyhover" key={`FRIEND->${friend.id}`}>
                <Link
                  to={`/friends/` + friend.id}
                  className="greyhover"
                  style={{
                    textDecoration: `none`,
                    color: `#5BC5A7`,
                    // overflowX: `hidden`,
                    // textOverflow: `ellipsis`
                  }}
                  onClick={() => this.props.select(friend.id)}
                >
                  <div
                    style={{ color: `#5bc5a7`, opacity: `.8` }}
                    className="friendItem showLeftGreen"
                    tabIndex="-1"
                    key={friend.id}
                  >
                    <img height="25" src={window.user}></img>
                    {friend.friends_name.substring(0, 15)}{" "}
                    {friend.friends_name.length < 17 || "..."}
                  </div>
                </Link>
              </div>
            ) : (
              <div key={`FRIEND->${friend.id}`}>
                <Link
                  to={`/friends/` + friend.id}
                  className="greyhover"
                  style={{ textDecoration: `none` }}
                  onClick={() => this.props.select(friend.id)}
                >
                  <div
                    style={{ color: `black`, opacity: `.8` }}
                    className="friendItem showLeftWhite"
                    tabIndex="-1"
                    key={friend.id}
                  >
                    <img
                      height="25"
                      style={{ opacity: `.6` }}
                      src={window.user}
                    ></img>
                    {friend.friends_name.substring(0, 15)}{" "}
                    {friend.friends_name.length < 17 || "..."}
                  </div>
                </Link>
              </div>
            )
          ) : null
        )}
        <br />
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    friends: Object.values(state.entities.friends),
    current_user: state.entities.users[state.session.id].username,
    selectedFriendshipid: Object.values(state.ui.friendSelectReducer)[0],
  };
};

const mDTP = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    fetchFriends: () => dispatch(fetchFriends()),
    select: (friendshipId) => dispatch(select(friendshipId)),
  };
};

export default withRouter(connect(mSTP, mDTP)(Friends));
