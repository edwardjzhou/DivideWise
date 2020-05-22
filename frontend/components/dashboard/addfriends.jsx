import React from "react";
import { connect } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const AddFriends = ({ openModal }) => {
  const sessionLinks = () => (
    <a className="addfriends" onClick={() => openModal("Add")}>
      +add
    </a>
  );

  return sessionLinks();
};

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser, //guaranteed by being logged in. we have to be logged in to click this modal
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends);
