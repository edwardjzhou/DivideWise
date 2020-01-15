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
import { connect } from 'react-redux';



import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import SignUpFormContainer from '../session_form/signup_form_container';
import LoginFormContainer from '../session_form/login_form_container';
import Footer from './footer';
import NavBar from './navbar';


class Splash extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            seconds: 0,
            answer: "with anyone"
         };

    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 10000);
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
        
        let answer = "with anyone."
        if (this.state.seconds % 3 === 0) {
            answer = "with anyone."
        } else if (this.state.seconds % 3 === 1) {
            answer = "with housemates."
        } else {
            answer = "with your partner."
        }
        
        this.setState(state => ({
            answer: answer
        }))
    }


    render() {
        return ( 
            <div>
                <NavBar></NavBar>
                <div className="flex_container">
                    {/* logout notification message */}
                    {this.props.message ? <div className="alert-message">{this.props.message}</div> : null} 
                    <p>Less stress when sharing expenses <span className="w3-animate-fading">{this.state.answer}</span>
                        {/* <span id='swap-one'></span>
                        <span id='swap-two'></span>
                        <span id='swap-three'</span> */}
                    </p>
                    <LoginFormContainer></LoginFormContainer>
                    
                    {/* errors from logging in  */}
                    <span className="errors">{this.props.errors}</span>
                    {/* end errors from logging in */}

                </div>
            
                {/* <div className="bottompad">
                </div> */}

                 <Footer></Footer>
               
            </div>
            )
    }
}

const mstp = (state) => {
    return {
        errors: Object.values(state.errors.session),
        message: state.session.message
    }
}
const mdtp = (dispatch) => {
    return {

    }
}

export default connect(mstp,mdtp)(Splash)