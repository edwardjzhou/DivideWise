import React from "react";
import { connect } from "react-redux";
import { getUsers } from "../../../actions/session_actions";
import { createFriend, fetchFriends } from "../../../actions/friend_actions";

class FriendsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFriend: null,
      // searchString: "",
      successString: " ",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  // update(field) {
  //   return (e) =>
  //     this.setState({
  //       [field]: e.target.value,
  //     });
  // }

  handleSubmit(e) {
    e.preventDefault();
    let user_one_id;
    let user_two_id;
    if (this.state.selectedFriend > this.props.current_user_id) {
      user_one_id = this.props.current_user_id;
      user_two_id = this.state.selectedFriend;
    } else if (this.state.selectedFriend < this.props.current_user_id) {
      user_two_id = this.props.current_user_id;
      user_one_id = this.state.selectedFriend;
    }

    // debounce( () =>
    // {
    this.props.createFriend({
      user_one_id: user_one_id,
      user_two_id: user_two_id,
    });

    // this.props.fetchFriends();
    // }
    // , 50)
  }

  // $.ajax({
  //     method: 'POST',
  //     url: 'api/friendships',
  //     data: { friendship: { user_one_id: 3, user_two_id: 7} }
  // })

  // renderList() {
  //   return this.props.users
  //     .filter((user) => {
  //       return (
  //         user.username.includes(this.state.searchString) ||
  //         user.email.includes(this.state.searchString)
  //       );
  //     })
  //     .filter((user) => {
  //       return !this.props.friends
  //         .map((friend) => friend.friends_name)
  //         .includes(user.username);
  //     })
  //     .map((user) => {
  //       if (this.props.current_user != user) {
  //         return (
  //           <li
  //             onClick={this.update("selectedFriend")}
  //             value={user.id}
  //             key={user.id}
  //             tabIndex="-1"
  //           >
  //             {user.username}
  //           </li>
  //         );
  //       }
  //     });
  // }

  // onChange(e) {
  //   this.setState({
  //     searchString: e.target.value,
  //   });
  // }

  handleChange(e) {
    this.setState({
      selectedFriend: e.target.value,
    });
  }
  
  allowSubmit() {
    if (
      this.state.selectedFriend != null && !isNaN(this.state.selectedFriend)
 
    ) {
      return (
        <input
          style={{ width: `75px` }}
          className="greenbutton"
          type="submit"
          value="Save"
        ></input>
      );
    } else {
      return (
        <input
          style= {{width: `75px`}}
          className="greenbutton disabled"
          type="submit"
          value="Save"
          disabled="true"
        ></input>
      );
    }
  }

  // componentWillReceiveProps(newProps){

  // }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.friends.length < this.props.friends.length) {
      this.setState({successString: "Successfully added new friend!"})
    }
  }

  render() {
    return (
      // <div className="addfriend-form centerme">
      <div style={{ textAlign: `center` }}>
        <div id="formheader">Add Friends</div>
        {this.props.error.length
          ? this.props.error.map((err) => {
              if (err.includes("has already been taken"))
                err = "that friendship already existed!";
              return (
                <p key={err} style={{ color: `red`, fontSize: `30px` }}>
                  {" "}
                  {err}{" "}
                </p>
              );
            })
          : null}
        <label>
          Find a <span className="STRONG">friend</span>&nbsp;
          <form onSubmit={this.handleSubmit}>
            <select
              onChange={this.handleChange}
              value={this.state.selectedFriend}
            >
              <option value={null}>FIND A FRIEND</option>
              {this.props.users.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.username}
                </option>
              ))}
            </select>

            <br />
            <span> {this.state.successString}</span>

            <img src={window.orangedude} style={{ height: `50px` }} />
            {/* <p>{this.state.selectedFriend}</p> */}
            <br />
            <div style={{bottom: `15px`, right: `15px`, position: `absolute`}}>
              <button className="cancel" onClick={this.props.closeModal}>
                Cancel
              </button>
              {this.allowSubmit()}
            </div>
          </form>
        </label>
      </div>
    );
  }
}


const mSTP = (state) => {
  return {
    error: state.errors.friend,
    friends: Object.values(state.entities.friends),
    current_user: state.entities.users[state.session.id],
    current_user_id: state.entities.users[state.session.id].id,
    users: Object.values(state.entities.users),
  };
};

const mDTP = (dispatch) => {
  return {
    createFriend: (friend) => dispatch(createFriend(friend)),
    getUsers: () => dispatch(getUsers()),
    fetchFriends: () => dispatch(fetchFriends()),
  };
};

export default connect(mSTP, mDTP)(FriendsForm);

//https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
// function debounce(func, wait, immediate) {
//   let timeout;

//   return function executedFunction() {
//     let context = this;
//     let args = arguments;

//     let later = function () {
//       timeout = null;
//       if (!immediate) func.apply(context, args);
//     };

//     let callNow = immediate && !timeout;

//     clearTimeout(timeout);

//     timeout = setTimeout(later, wait);

//     if (callNow) func.apply(context, args);
//   };
// }
