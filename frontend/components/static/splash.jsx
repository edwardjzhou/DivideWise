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
import { withRouter } from "react-router";




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
        var sectionStyle = {
            width: "100%",
            height: "600px",
            backgroundImage: "url(" +  window.facets  + ")"
        };



        return ( 
            <div>
                {/* <div className="flex_container"> */
                }

                
                <div id="topbar-container">
                    <div>
                        <NavLink to="/">
                            {/* Dividewise */}
                            <img src={window.logoURL} height="60"></img>
                        </NavLink>
                    </div>

                    <div id="rightsidediv">
                        <div>
                            <NavLink className="whitelogin" to="/login">
                                Log in
                            </NavLink>
                        </div>
                        <div>
                            <NavLink className="tealsignup" to="/signup">
                                Sign up
                            </NavLink>
                        </div>
                    </div>
                </div>




                <div>
                    {/* logout notification message */}
                    {this.props.message ? <div className="alert-message">{this.props.message}</div> : <br></br>} 
                

                    {/* {window.location.pathname}  this is the correct one with / */}
                    
                    <div id="facets" style={sectionStyle}>
                        <div className="transformingtext">
                            <p id="text-swap">Less stress when<br/> dividing expenses&nbsp;<br/>
                                <span className="w3-animate-fading">
                                    <dt className="text-heart">{this.state.answer}</dt>
                                </span>
                            </p>

                            <div>Keep track of your shared expenses and balances <br></br>with housemates, trips, groups, friends, and family.</div>
                        </div>
                        <div>
                            <img src={window.heart} height='50' className="filter-red"></img>
                            <img src={window.plane} height='50' className="filter-blue"></img>
                            <img src={window.house} height='50' className="filter-green"></img>

                        </div>
                       

                    </div>

                    <div className="elephants">
                        <img height="300" src={window.elephantx} className="cellphone"></img>
                        <img height="300" src={window.elephanty} className="cellphone"></img>
                        <img height="300" src={window.elephantz} className="cellphone"></img>
                    </div>

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

export default connect(mstp,mdtp)(Splash);