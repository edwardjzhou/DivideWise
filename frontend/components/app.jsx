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


import { AuthRoute, ProtectedRoute } from '../util/route_util';
import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';
import Footer from './static/footer';
import NavBar from './static/navbar';


class App extends React.Component{
    render(){

        return( 
            <div className="wrapper">
                <header>
                    <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
                </header>

                <NavBar></NavBar>
              
                <div className="flex_container">
                    <br />Less stress when sharing expenses with anyone.
                    
                    <img src={`${window.logoURL}`} alt="Logo square" className="login_logo" width="200" height="200" />
                    <Switch>
                        <AuthRoute exact path="/login" component={LogInFormContainer} />
                        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                    </Switch>
                    
                </div>

                <div className="bottompad">
                </div>

                <Footer></Footer>
            </div>
        );         
    }
}

export default App;
