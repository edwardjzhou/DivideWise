import React from "react";
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";

class Payments extends React.Component {
  // I SHOULD BE MADE DUMB SINCE I DONT CRUD ANY PAYMENTS.
  // no state I THINK

  constructor(props) {
    super(props);
    // given this.props.bill
  }

  componentDidMount() {}

  renderPaymentItem(payment, bill) {
    return (
      <div
        key={`PAYMENT->${payment.id}`}
        style={{
          // width: `50%`,
        }}
      >
        <div
          style={{
            cursor: `pointer`,
            padding: `9px 5px 6px 9px`,
            // justifyContent: `space-between`,
            marginLeft: ``,
            marginRight: `50px`,
            display: `flex`
          }}
        >

            <img
              height="19px"
              width="19px"
              style={{ margin: `0` }}
              src={window.payment}
            />

            &nbsp;

            <div>
              {new Date(
                Object.values(payment)[0].created_at
              ).toLocaleDateString("en-US")}
            </div>

            {Object.values(payment)[0].payer_id == this.props.current_user_id
              ? this.props.current_user.username + " paid " + bill.lender
              : bill.borrower + " paid " + this.props.current_user.username}
            ${Object.values(payment)[0].amount / 100 + " "}

        </div>


        <div style={{ display: ``, paddingLeft: `0` }}>
          {Object.values(payment)[0].payer_id == this.props.current_user_id
            ? "you paid "
            : "you received "}
          ${Object.values(payment)[0].amount / 100 + " "}
        </div>

      </div>
      
    );
  }

  render() {
    const { bill } = this.props;
    
    return (
      <>
      <div style={{width:`100%`, backgroundColor: `blue`}}>
          {bill && bill.payments != undefined && bill.payments.length > 0
            ? bill.payments.map((payment) => {
                return this.renderPaymentItem(payment, bill);
              })
            : null}
        </div>
      </>
    );
  }
}

const mSTP = (state) => {
  return {
    current_user_id: state.entities.users[state.session.id].email,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchBills: () => dispatch(fetchBills()),
  };
};

export default connect(mSTP, mDTP)(Payments);
