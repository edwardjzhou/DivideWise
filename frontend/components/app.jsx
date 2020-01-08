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

const App = () => (
  <div>
    <header>
        <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
        <NavLink to="/" className="header-link">
                <h1>Dividewise</h1>
        </NavLink>
        <NavLink to="/login"
        activeStyle={{ fontWeight: 'bold' }}>
            Log in
        </NavLink>

    </header>

        <Route exact path="/login" component={LogInFormContainer} />
        <Route exact path="/signup" component={SignUpFormContainer} />


      Made with :( in San Francisco, USA
  </div>
);

export default App;
