import React from "react";
import { Provider } from "react-redux";
import { Route, Redirect, Switch, Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { AuthRoute, ProtectedRoute } from "../../util/route_util";
import SignUpFormContainer from "../session_form/signup_form_container";
import LoginFormContainer from "../session_form/login_form_container";
import Footer from "./footer";
import NavBar from "./navbar";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      answer: "with anyone",
      url: window.plane,
      classname: "filter-blue",
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 10000);
  }

  tick() {
    this.setState((state) => ({
      seconds: state.seconds + 1,
    }));

    let answer = "with anyone.";
    let url = window.plane;
    let classname = "filter-blue";
    if (this.state.seconds % 3 === 0) {
      answer = "with anyone.";
      url = window.plane;
      classname = "filter-blue";
    } else if (this.state.seconds % 3 === 1) {
      answer = "with housemates.";
      url = window.house;
      classname = "filter-green";
    } else {
      answer = "with your partner.";
      url = window.heart;
      classname = "filter-red";
    }

    this.setState({
      answer: answer,
      url: url,
      classname: classname,
    });
  }

  render() {
    var sectionStyle = {
      width: "100%",
      height: "600px",
      backgroundImage: "url(" + window.facets + ")",
      // backgroundColor: "gray"
    };

    return (
      <div>
        {/* <div className="flex_container"> */}

        <div id="topbar-container">
          <div>
            <NavLink to="/">
              {/* Dividewise */}
              <img src={window.logoURL} height="75"></img>
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
          {this.props.message ? (
            <div className="alert-message">{this.props.message}</div>
          ) : null}

          {/* {window.location.pathname}  this is the correct one with / */}

          <div id="facets" style={sectionStyle}>
            <div className="transformingtext">
              <p id="text-swap">
                Less stress when
                <br /> dividing expenses&nbsp;
                <br />
                <span className="w3-animate-fading">
                  <dt
                    className={["text-heart", this.state.classname].join(" ")}
                  >
                    {this.state.answer}
                  </dt>
                </span>
              </p>

              <div id="subtext">
                <img
                  src={window.heart}
                  height="50"
                  className="filter-red"
                ></img>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  src={window.plane}
                  height="50"
                  className="filter-blue"
                ></img>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <img
                  src={window.house}
                  height="50"
                  className="filter-green"
                ></img>
                <br />
                Keep track of your shared expenses <br></br>and balances with
                housemates, trips,<br></br>groups, friends, and family.
                <br />
                <div>
                  <NavLink
                    className={["tealsignup2", this.state.classname].join(" ")}
                    style={{ width: `50%` }}
                    to="/signup"
                  >
                    Sign up
                  </NavLink>
                </div>
              </div>
            </div>

            <div className="w3-animate-fading asdf">
              <img
                src={this.state.url}
                height="350"
                className={this.state.classname}
              ></img>
              {/* <img src={window.plane} height='350' className="filter-blue"></img>
                            <img src={window.house} height='350' className="filter-green"></img> */}
            </div>
          </div>
        </div>

        <div className="boxparent">
          <div
            className="boxbro"
            style={Object.assign({ backgroundColor: "gray" }, sectionStyle)}
          >
            <h3>Track balances</h3>
            <p>Keep track of shared expenses, balances, and who owes who.</p>
            <img
              height="500"
              src={window.elephantx}
              className="cellphone"
            ></img>
          </div>

          <div
            className="boxbro"
            style={Object.assign({ backgroundColor: "teal" }, sectionStyle)}
          >
            <h3>Organize expenses</h3>
            <p>
              Split expenses with any group: trips, housemates, friends, and
              family.
            </p>
            <img
              height="500"
              src={window.elephanty}
              className="cellphone"
            ></img>
          </div>
        </div>

        <div className="boxparent">
          <div
            className="boxbro"
            style={Object.assign({ backgroundColor: "orange" }, sectionStyle)}
          >
            <h3>Add expenses easily</h3>
            <p>Quickly add expenses on the go before you forget who paid.</p>
            <img
              height="500"
              src={window.elephantz}
              className="cellphone"
            ></img>
          </div>

          <div
            className="boxbro"
            style={Object.assign({ backgroundColor: "gray" }, sectionStyle)}
          >
            <h3>Pay friends back</h3>
            <p> with a friend and record any cash or online payment.</p>
            <img
              height="500"
              src={window.elephanta}
              className="cellphone"
            ></img>
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    errors: Object.values(state.errors.session),
    message: state.session.message,
  };
};
const mdtp = (dispatch) => {
  return {};
};

export default connect(mstp, mdtp)(Splash);
