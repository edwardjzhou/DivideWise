import { connect } from 'react-redux';
import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import CardContainer from './card_container'

const NavBar = () => {

    // let style = `{color: 'orange', display: flex}`;


   
    return (
        <div className="flex-container" style={{boxShadow: `rgba(0, 0, 0, 0.5) 0px 0px 3px 0px`}}>
            {/* <div className="header"> */}
            <NavLink to="/" className="header-link">
                {/* <h3>dividewise</h3> */}
                <img src={window.logoURL} style={{height: `60px`}}></img>
            </NavLink>

            {/* <div className="login_links" > */}
            <div id="flexme" >
                {/* {window.location.pathname != "/login" ?  */}
                    <CardContainer></CardContainer> 
                <span style={{verticalAlign: `50%`, fontSize: `15px` ,color:`white`, marginTop:`20px`}}>&nbsp;or</span>&nbsp;   
                <button className="orangebutton">
                    <NavLink to="/signup" style={{textDecoration: `none`}}>
                    Sign up
                    </NavLink>
                </button>
            </div>
            </div>
        // </div>
    )
}
export default NavBar