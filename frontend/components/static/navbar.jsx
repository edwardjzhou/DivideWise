import { connect } from 'react-redux';
import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import CardContainer from './card_container'

const NavBar = () => {

    // let style = `{color: 'orange', display: flex}`;


   
    
    return (
        <div className="flex-container">
            {/* <div className="header"> */}
            <NavLink to="/" className="header-link">
                <h3>dividewise</h3>
            </NavLink>

            {/* <div className="login_links" > */}
            <div id="flexme">
                {/* {window.location.pathname != "/login" ?  */}
                    <CardContainer></CardContainer> 
                or &nbsp;   
                <button className="btn">
                    <NavLink to="/signup">
                    Sign up
                    </NavLink>
                </button>
            </div>
            </div>
        // </div>
    )
}
export default NavBar