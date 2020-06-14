//curl - v - H "Accept: appli"Content - type: application / json" -X POST -d ' {"user":{"username":"edward","password":"password"}}'  http://localhost:3000/api/session -b name=var
//https://github.com/mumuy/pacman/blob/master/game.js
// still debating whether or not i could have done everything with local state almost with almost all local state stored in dashbaord component
// grid loses vs other inline divs... it cant push them away if they have dimensions

// container → structural → presentational components ONLY WRAP presentational components with styled components. so dont do what im doing
// i swear i think styled components changes take a long time to reflect i have to refresh for 5 seconds+

import React, {useState} from "react";
import { connect } from "react-redux";
import { fetchBills, fetchBill } from "../../actions/bill_actions";
import { NavLink, Link, Route, Switch } from "react-router-dom";
import Friends from "./friends";
import { logout } from "../../actions/session_actions";
import Bills from "./bills";
import Friendbills from "./friendbills";
import LogoutCard from "./dashboardlogoutcard";
import styled from 'styled-components';
import RightSidebar from './rightsidebar';

// id idnt know props could just be passed as random unassigned names like primary inside jsx tags. i belive they take on true like html attrs ?
// if you pass a component as a function to a styled component variable. the component you're passing better set its className = this.props.className that i guess styled component creates 
// and passes to the argument component. confusing but understadnable

//need learn renderprops, refs , context
//didnt realize string == true was false  
// is this presentational OR container? presentaitonal probably no state 
// any component fetching data is a container (commentlistcontainer). it should send everyhting it fetches like an array you would map over to a (commentlist to map out)


const Grid = styled.div` 
display: grid;
// background-color: purple;
// background-color: ${props => props.primary==0 ? "palevioletred" : "white"};
grid-template-rows: min(6.5%, 50px) auto;
grid-template-columns: 30% max(40%,600px) 30%;
min-height: 100vh;
min-width: 100vw
`

const DashboardNavbar = styled.div`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  
  font-family: Lato, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-decoration: none solid rgb(255, 255, 255);
  text-align: start;
  text-indent: 0px;
  text-transform: none;
  vertical-align: baseline;
  white-space: normal;
  word-spacing: 0px;

  background-color: rgb(91, 197, 167);
 
  background-position: 0% 0%;
  background-repeat: repeat-x;
  color: rgb(255, 255, 255);

  /* Box */
  // height: 20%; this is useless 
  // width: 100%;
  // border:

  margin: 0px;
  padding: 0px;
  float: none;
  display: flex;
  justify-content: space-around;
  overflow: visible;
  box-sizing: content-box;
  text-overflow: clip;
  word-wrap: normal;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
  z-index: 100;
`

const StyledFriends = styled(Friends)`
  grid-column-start: 1; 
  grid-column-end: 2; 
  grid-row-start: 2; 
  grid-row-end: 3; 
  justify-self: end;
`

// this is borken because Switch the component gets a new classname prop that i cant get out to either of the children of the new higherorder component
// figure out smarter way later
const StyledBills = styled(Bills)`
  grid-column-start: 2; 
  grid-column-end: 3; 
  grid-row-start: 2; 
  grid-row-end: 3; 
  // background-color: purple;
  -webkit-box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`
const StyledFriendbills = styled(Friendbills)`
  grid-column-start: 2; 
  grid-column-end: 3; 
  grid-row-start: 2; 
  grid-row-end: 3; 
  // background-color: purple;
  -webkit-box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
`
const ThirdColumn = styled(RightSidebar)`
  grid-column-start: 3; 
  grid-column-end: 4; 
  grid-row-start: 2; 
  grid-row-end: 3; 
  justify-self: start;
  // color: purple;
`

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
                <img src={window.logoURL} style={{ height: `50px` }}/>
              </NavLink>
              <LogoutCard
                name={this.props.current_user}
                logout={this.props.logout}
              />
            </DashboardNavbar>



            {/* 1st col in 2nd row friends stays mounted to the left */}
            <StyledFriends /> 



        {/* internet says use renderprops here otherwise no way to get props from container component (dashboard.jsx) to a props.children component */}
            {/* 2nd col in 2nd row center section that changes depending on if we're in /#/Dashboard or /#/Friends or not */}
            <Switch>
              <Route path="/dashboard">
                  <StyledBills/>
              </Route> 
              <Route path="/friends/:friendId" component={StyledFriendbills} />
              {/* <Route path="/dashboard" render={() => <Bills />} />
              <Route path="/friends/:friendId" render={() => <Friendbills/>} /> */}
            </Switch> 



            {/* third column in 2nd row */}
            <ThirdColumn/>
              

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
