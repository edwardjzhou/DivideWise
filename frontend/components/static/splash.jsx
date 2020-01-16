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
            height: "400px",
            backgroundImage: "url(" +  window.facets  + ")"
        };



        return ( 
            <div>
                {/* <div className="flex_container"> */
                }

                
                <div className="flex-container">
                    {/* <div className="header"> */}
                    <NavLink to="/" className="header-link">
                        <h2>Dividewise</h2>
                    </NavLink>

                    {/* <div className="login_links" > */}
                    <div id="flexme">
                            <NavLink to="/login" />
                             
                        }
                    
                        <button className="btn">
                            <NavLink to="/signup">
                                Sign up
                            </NavLink>
                        </button>
                    </div>
                </div>




                <div>
                    {/* logout notification message */}
                    {this.props.message ? <div className="alert-message">{this.props.message}</div> : <br></br>} 
                
                    {/* <LoginFormContainer></LoginFormContainer> */}
                     {/* {this.props.location} */}
                    {/* {window.location.href} */}
                    {/* {window.location.pathname}  this is the correct one with / */}
                    
                    <div id="facets" style={sectionStyle}>
                        <p id="text-swap">Less stress when dividing expenses <span className="w3-animate-fading">
                            <dt className="text-heart">{this.state.answer}</dt>
                        </span>
                        
                            {/* <span id='swap-one'></span>
                        <span id='swap-two'></span>
                        <span id='swap-three'</span> */}
                        </p>
                        <div>Keep track of your shared expenses and balances with housemates, trips, groups, friends, and family.</div>
                        <div className="elephants">
                            <img height="300" src={window.elephantx}></img>
                            <img height="300" src={window.elephanty}></img>
                            <img height="300" src={window.elephantz}></img>
                        </div>
                       

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