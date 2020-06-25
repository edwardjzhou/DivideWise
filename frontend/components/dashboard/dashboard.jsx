import React from "react";
import { connect } from "react-redux";
import { fetchBills } from "../../actions/bill_actions";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import { logout } from "../../actions/session_actions";
import { Grid, DashboardNavbar, StyledFriends, StyledBills, StyledFriendbills, ThirdColumn} from "./styledDashboard"
import LogoutCard from "./dashboardlogoutcard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Grid>
          {/* navbar */}
          <DashboardNavbar>
            <NavLink to="/">
              <img src={window.logoURL} style={{ height: `50px` }} />
            </NavLink>
            <LogoutCard
              name={this.props.current_user}
              logout={this.props.logout}
            />
          </DashboardNavbar>

          {/* 1st col in 2nd row friends stays mounted to the left */}
          <StyledFriends />

          {/* 2nd col in 2nd row center section that changes depending on if we're in /#/Dashboard or /#/Friends or not */}
          <Switch>
            <Route path="/dashboard">
              <StyledBills />
            </Route>
            <Route path="/friends/:friendId" component={StyledFriendbills} />

          </Switch>

          {/* third column in 2nd row */}
          <ThirdColumn />
        </Grid>
      </>
    );
  }
}

const mSTP = (state) => {
  return {
    bills: Object.values(state.entities.bills),
    current_user: state.entities.users[state.session.id].username,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchBills: () => dispatch(fetchBills()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mSTP, mDTP)(Dashboard);
