import React from "react";
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import Friends from "./friends";
import { logout } from "../../actions/session_actions";
import Bills from "./bills";
import Friendbills from "./friendbills";
import LogoutCard from "./dashboardlogoutcard";
import styled from 'styled-components';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <div className="row" style={{ height: `100%` }}>
      <div style={{
              display: `flex`, //flex is the same as flexbox which is kinda deprecated
              flexWrap: `wrap`, //nowrap is forced into one line
             alignItems: `stretch`, // (default): stretch to fill the container (still respect min-width/max-width)
              height: `auto`,
              width: `100%`, }}>
        {/* marginBottom: `-99999px`, paddingBottom: `99999px`, overflow:`hidden`}}> */}
        
        <div id="dashboardnavbar">
          {/* {" "} */}
          <NavLink to="/">
            <img src={window.logoURL} style={{ height: `50px` }}></img>
          </NavLink>
          <LogoutCard
            name={this.props.current_user}
            logout={() => this.props.logout()}
          ></LogoutCard>
        </div>

        {/* friends stays mounted to the left */}
        <Friends /> 

        {/* center section that changes depending on if we're in /#/Dashboard or /#/Friends or not */}
        <Switch>
          <Route path="/dashboard" component={Bills} />
          <Route path="/friends/:friendId" component={Friendbills} />
        </Switch>
      </div>
    );
  }
}

const mSTP = (state) => {
  return {
    bills: Object.values(state.entities.bills),
    // user: Object.values(state.entities.users)[0].username,
    current_user: state.entities.users[state.session.id].username,
    // currentUser: session.currentUser
  };
};

const mDTP = (dispatch) => {
  return {
    fetchBills: () => dispatch(fetchBills()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mSTP, mDTP)(Dashboard);
