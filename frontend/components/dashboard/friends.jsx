import React from "react";
// import LeftMenu from './left_menu'
//import Modal from './modal'
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { Link, withRouter } from "react-router-dom";
import { openModal, closeModal } from "../../actions/modal_actions";
import AddFriends from "./addfriends";
import { fetchFriends } from "../../actions/friend_actions";
import { select } from "../../actions/ui_actions";

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.props.fetchFriends();
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.friends !== this.props.friends ||
      prevProps.selectedFriendshipid !== this.props.selectedFriendshipid
    ) {
      // console.log('friends props has changed.')
      // console.log(this.props.location.pathname)
      this.forceUpdate();
      return true;
    }
  }

  render() {
    return (
      <div id="friends_bar" className="">
            {/* <div id="friends_bar" className="column"> */}

        {/* <div> */}
          {/* {console.log(this.props.selectedFriendshipid)} */}
          {/* {console.log(this.props.location.pathname.split('/')[this.props.location.pathname.split('/').length - 1])} */}
          <div className="greyhover" style={{clear:`both`}}>
            {location.href.includes("dashboard") ? (
              <Link
                to="/"
                style={{
                  color: `#5BC5A7`,
                  fontSize: `40`,
                  fontWeight: `bold`,
                  borderLeft: `8px solid #5BC5A7`,
                  textDecoration: `none`,
                }}
              >
                Dashboard
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
            ) : (
              <Link
                to="/"
                style={{
                  textDecoration: `none`,
                  color: "gray",
                  fontSize: "40",
                  fontWeight: `bold`,
                }}
              >
                Dashboard
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Link>
            )}
          </div>
          <div className="header">
            {" "}
            FRIENDS<AddFriends></AddFriends>
          </div>
          {this.props.friends.map((friend) =>
            friend.friends_name !== this.props.current_user ? (
              // this.props.location.pathname[this.props.location.pathname.split('/').length - 1] !== friend.id ?
              //this.state.loc.split('/')[location.href.split('/').length-1]
              this.props.selectedFriendshipid == friend.id &&
              !this.props.location.pathname.includes("dashboard") &&
              this.props.location.pathname.split("/")[
                this.props.location.pathname.split("/").length - 1
              ] == friend.id ? (
                //  && this.props.location.pathname[this.props.location.pathname.split('/').length - 1] == friend.id ?
                //
                <div className="greyhover">
                  <Link
                    to={`/friends/` + friend.id}
                    className="greyhover"
                    style={{
                      textDecoration: `none`,
                      color: `#5BC5A7`,
                      // borderLeft: `8px solid #5BC5A7`
                    }}
                    onClick={() => this.props.select(friend.id)}
                  >
                    <div
                      style={{ color: `#5bc5a7` }}
                      className="friendItem showLeft"
                      tabIndex="-1"
                      key={friend.id}
                    >
                      <img height="25" src={window.user}></img>
                      {friend.friends_name}{" "}
                    </div>
                  </Link>
                </div>
              ) : (
                <div>
                  <Link
                    to={`/friends/` + friend.id}
                    className="greyhover"
                    style={{ textDecoration: `none` }}
                    onClick={() => this.props.select(friend.id)}
                  >
                    <div className="friendItem" tabIndex="-1" key={friend.id}>
                      <img height="25" src={window.user}></img>
                      {friend.friends_name}{" "}
                    </div>
                  </Link>
                </div>
              )
            ) : null
          )}
          <br></br>
        {/* </div> */}
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    friends: Object.values(state.entities.friends),
    //user: Object.values(state.entities.users)[0].username,
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
