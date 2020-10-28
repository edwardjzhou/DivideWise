import styled from "styled-components";
import RightSidebar from "./rightsidebar";
import Friends from "./friends";
import Bills from "./bills";
import Friendbills from "./friendbills";

export const Grid = styled.div`
  display: grid;
  grid-template-rows: 51px auto;
  grid-template-columns: 30% max(40%, 600px) 30%;
  min-height: 100vh;
  min-width: 100vw;
`;

export const DashboardNavbar = styled.div`
  max-height: 51px;
  height: 51px;
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
`;

export const StyledFriends = styled(Friends)`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: end;
`;

export const StyledBills = styled(Bills)`
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
`;

export const StyledFriendbills = styled(Friendbills)`
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
`;

export const ThirdColumn = styled(RightSidebar)`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  justify-self: start;
  // color: purple;
`;
