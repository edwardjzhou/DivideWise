import { connect } from 'react-redux';
import React from 'react';
import { Link, NavLink} from 'react-router-dom';


const NavBar = () => {
    return (
        <div className="navbar">
            <NavLink to="/" className="header-link">
                <h2>Dividewise</h2>
            </NavLink>

            <div className="login_links">
                <button className="btn">
                    <NavLink to="/login"
                    >
                    Log in
                    </NavLink>
                </button>
                or
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