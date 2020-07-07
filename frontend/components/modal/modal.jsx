import React from "react";
import { closeModal } from "../../actions/modal_actions";
import { connect } from "react-redux";

import FriendsForm from "../dashboard/forms/friendsform";
import BillsForm from "../dashboard/forms/billsform";
import PaymentsForm from "../dashboard/forms/paymentsform";
import styled from "styled-components";

const StyledModalChild = styled.div`
  // width: min(30%, 400px);
  // height: min(40%, 450px);
  width: 400px;
  height: 450px;
  z-index: 99999;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-overflow: clip;
  word-wrap: normal;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 8px 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: white;
  list-style-type: none;
  list-style: none;
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  // opacity:0;
  // -webkit-transition: opacity 400ms ease-in;
  // -moz-transition: opacity 400ms ease-in;
  // transition: opacity 400ms ease-in;
  // pointer-events: none;
`;

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
    <StyledModalBackground onClick={closeModal}>
      <StyledModalChild onClick={(e) => e.stopPropagation()}>
        <a
          style={{
            float: "right",
            fontSize: `22px`,
            color: `white`,
            margin: `0 5px 5px 0`,
            zIndex: 999999,
            cursor: `pointer`,
          }}
          onClick={closeModal}
        >
          X
        </a>
        {component}
      </StyledModalChild>
    </StyledModalBackground>
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
