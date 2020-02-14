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
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import Splash from './static/splash';
import Dashboard from './dashboard/dashboard';
import Modal from './modal/modal';



class App extends React.Component{
    render(){

        return( 
            <div className="wrapper">
                <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet" />
                
                {/* fade in animation */}
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
                    <Modal />
                    <Switch>
                        <ProtectedRoute path='/dashboard' component={Dashboard} />
                        <ProtectedRoute path="/friends/:friendId" component={Dashboard} /> "
                        <AuthRoute path="/login" component={LoginFormContainer} /> 
                        <AuthRoute path="/signup" component={SignupFormContainer} /> 
                        <AuthRoute path="/" component={Splash} />
                    </Switch>
            </div>
        );         
    }
}

export default App;
