import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";

import FriendsForm from "../dashboard/friendsform";
import BillsForm from "../dashboard/billsform";
import PaymentsForm from "../dashboard/paymentsform";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case "Add":
      component = <FriendsForm />;
      break;
    case "BillCreate":
      component = <BillsForm />;
      break;
    case "PaymentCreate":
      component = <PaymentsForm />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        <a
          style={{
            float: "right",
            fontSize: `25px`,
            color: `white`,
            margin: `0 5px 0 0`,
          }}
          onClick={closeModal}
        >
          X
        </a>
        {component}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
