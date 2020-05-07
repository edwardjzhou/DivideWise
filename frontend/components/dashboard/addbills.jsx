import React from "react";
import { connect } from "react-redux";
import { withRouter, match } from "react-router-dom";
import { openModal } from "../../actions/modal_actions";

const AddBills = ({ currentUser, openModal, match }) => {
  // width: `auto`, position: `relative`,
  const sessionLinks = () => (
    <div
      style={{
        width: `auto`,
        minWidth: `45%`,
        margin: `0 10px 0 50px`,
        paddingRight: `3%`,
        display: `inline-block`,
        position: `static`,
      }}
    >
      {/* //right:`30%`, top: `5%`, position: `absolute`, */}
      <button
        style={{ fontSize: `.7em`, width: `auto` }}
        className="orangebutton"
        onClick={() => openModal("BillCreate")}
      >
        Add an Expense
      </button>
      &nbsp;
      <button
        style={{ fontSize: `.7em`, width: `auto`, backgroundColor: `#48be9d` }}
        className="orangebutton"
        onClick={() => openModal("PaymentCreate")}
      >
        Settle up
      </button>
      &nbsp;
    </div>
  );

  return sessionLinks();
};

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  openModal: (modal) => dispatch(openModal(modal)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddBills)
);
