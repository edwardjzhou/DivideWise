import { connect } from 'react-redux';
import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import CardContainer from './card_container'

const NavBar = () => {

    // let style = `{color: 'orange', display: flex}`;
    return (
        <div className="navbar">
            <NavLink to="/" className="header-link">
                <h2>Dividewise</h2>
            </NavLink>

            <div className="login_links" >
                <CardContainer></CardContainer>

                or    .
                <button className="btn">
                    <NavLink to="/signup"
                    activeClassName="isDisabled"
                    activeStyle={{ cursor: 'bold' }}
                    >
                    Sign up
                    </NavLink>
                </button>
            </div>
        </div>
    )
}
export default NavBar