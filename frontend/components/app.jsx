import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  NavLink,
  HashRouter
} from 'react-router-dom';

import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';

class App extends React.Component{
    render(){

        return( 
            <div className="wrapper">
                <header>
                    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
                </header>

                <div className="navbar">
                    <NavLink to="/" className="header-link">
                        <h1>Dividewise</h1>
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
              
                <div className="flex_container">
                    <br />Less stress when sharing expenses with anyone.
                    
                    <img src={`${window.logoURL}`} alt="Logo square" className="login_logo" width="200" height="200" />
                    <Switch>
                        <Route exact path="/login" component={LogInFormContainer} />
                        <Route exact path="/signup" component={SignUpFormContainer} />
                    </Switch>
                    
                </div>

                <div className="bottompad">
                </div>

                <div className="footer">
                    Made with :( in San Francisco, USA
                    <a href="/jobs">Jobs</a> |
                    <a href="/calculators">Calculators</a> |
                    <a href="https://blog.splitwise.com">Blog</a> |
                    <a href="/terms">Terms</a> |
                    <a href="/press">Press</a> |
                    <a href="http://dev.splitwise.com">API</a> |
                    <a href="/contact">Contact me</a>
                </div>
            </div>
        );         
    }
}

export default App;
