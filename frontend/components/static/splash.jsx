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


import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SignUpFormContainer from '../session_form/signup_form_container';
import LoginFormContainer from '../session_form/login_form_container';
import Footer from './footer';
import NavBar from './navbar';


class Splash extends React.Component {
    


    render() {

        return ( 
            <div>
                <NavBar></NavBar>
            
                <div className="flex_container">
                    <p>Less stress when sharing expenses 
                        <span>with anyone.</span>
                        <span>with housemates.</span>
                        <span>with your partner.</span>
                    </p>
                    <LoginFormContainer></LoginFormContainer>
                </div>
            
            
            


                <div className="bottompad">
                </div>

                 <Footer></Footer>
               
            </div>
            )
    }
}
export default Splash