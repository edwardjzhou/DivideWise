import React from "react";
import { NavLink } from "react-router-dom";
import CardContainer from "./card_container";

const NavBar = () => {
  return (
    <div
      className="flex-container"
      style={{ boxShadow: `rgba(0, 0, 0, 0.5) 0px 0px 3px 0px` }}
    >
      <NavLink to="/" className="header-link">
        <img src={window.logoURL} style={{ height: `60px` }}></img>
      </NavLink>

      <div id="flexme">
        <CardContainer />
        <span
          style={{
            verticalAlign: `50%`,
            fontSize: `15px`,
            color: `white`,
            marginTop: `20px`,
          }}
        >
          &nbsp;or
        </span>
        &nbsp;
        <button className="orangebutton">
          <NavLink to="/signup" style={{ textDecoration: `none` }}>
            Sign up
          </NavLink>
        </button>
      </div>
    </div>
  );
};
export default NavBar;
