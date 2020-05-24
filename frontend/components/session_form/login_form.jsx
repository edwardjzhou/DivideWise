import React from "react";
import NavBar from "../static/navbar";
import { GoogleLogin } from 'react-google-login';

import { fetchOAUTH, verifyOAUTH } from './oauthsession.js'
import { signup } from "../../actions/session_actions";




class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoFill = this.demoFill.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this)
  }


  //LITTLE PROOF OF CONCEPT: this is unsafe since anyone can figure out the user's googleId 
// THIS PROBABLY ISNT SECURE IM JUST TESTING
// i dont want to do devise omniauth2 in rails
// is there any way i can 

// if this oauth token info confirmed email is in the users database as a username
// pretend we're in rails and from rails i send a get to the ooauth token info at googleapis.com
// can i just say we';re confiremd at this point and force change that user's password to nothing for a brief instant for login
// like can i @user = User.find_by(username: response.profileObj.email) @user.password = jsonwebtoken 
// then try to log him in 


// WHAT IF we let the user login to google and we get this frontend response.profileObj.JWT thing from that putative login
// we send that to our rails server which makes a get request from google to make sure its real
// then we find the user from our db with the the email from our rails get and set his pw to the 
// id_token or jwt token value and let the putative frontend google account guy try to login wiht his jwt id

  responseGoogle(response) {
    // let putativeJWT = null
    window.response = response
    // this.setState({ userDetails: response.profileObj, isUserLoggedIn: true });
    console.log(response)

    //i tried to get the user to get his own jwt from ajaxing google auth but its cors policy 
    // so maybe i just set intiial pw of a new account to user's token id ? and i just check with rails that that user token is that email and then set database user pw to that token id
    // seems relatively secure to me

    // fetchOAUTH(response.tokenId).then(res => {
    //   putativeJWT = res
    //   console.log(putativeJWT)
      // console.log(JSON.parse(putativeJWT))

    // })
    let answer 
    verifyOAUTH(response.tokenId, response.profileObj.email).then(res => {
      answer = res
      console.log(res)
    }) 

    // https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow#oauth-2.0-endpoints_2
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET',
    //   'https://www.googleapis.com/drive/v3/about?fields=user&' +
    //   'access_token=' + params['access_token']);
    // xhr.onreadystatechange = function (e) {
    //   console.log(xhr.response);
    // };
    // xhr.send(null);
    
    //promise object returned thats resolved


    this.props.processForm({
      username: response.profileObj.email,
      password: response.profileObj.googleId,
    }) // login do a little hackeysack here bounceing around and attempting both
    this.props.signup({
      username: response.profileObj.email,
      password: response.profileObj.googleId,
      email: response.profileObj.email
    }) 


     // signup
    // response.profileObj.tokenId do a GET to google website to confirm this guy
    // then I look up the user by email wiuth a normal login()
    // if no user then i do a signup with his username: response.profileObj.email and email the same then just give him a session token? 
    // no jwt no nothing
    // https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=eyJhiJSUzI1NiIsImtpZCI6Ijk2
    // {
      // "iss": "accounts.google.com",
      //   "azp": ", // my client id
      //     "aud": "", //my client id
      //       "sub": "", //google id
      //         "email": "@gmail.com",
      //           "email_verified": "true",
      //             "at_hash": "5Njg",
      //               "name": "edward",
      //                 "picture": "",
      //                   "given_name": "Edward",
      //                     "family_name": "",
      //                       "locale": "en",
      //                         "iat": "same as exp",
      //                           "exp": "same as iat",
      //                             "jti": "json web token here",
      //                               "alg": "RS256",
      //                                 "kid": "key id header parameter hint",
      //                                   "typ": "JWT"
    // }

  };

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  demoFill(e) {
    e.preventDefault()
    this.setState({
      username: "edward",
      password: "password",
    });
    setTimeout(() => this.props.processForm(this.state), 2000);
  }

  render() {
    // let styles = {transform: 'translate(-50 %, -50 %)'}
    return (
      <div className="login-form-container">
        <NavBar></NavBar>
        {/* errors from logging in  */}
        <br></br>
        {this.props.errors.length === 0 ? null : (
          <span className="alert">
            {this.props.errors.map((error) => error)}
          </span>
        )}
        {/* end errors from logging in */}
        <form onSubmit={this.handleSubmit} className="login-form-box">
          {/* <img src={`${window.logoURL}`} alt="Logo square" className="login_logo" width="600" height="300" /> */}
          <div className="welcome">WELCOME TO DIVIDEWISE</div>
          {/* Please {this.props.formType} or {this.props.navLink} */}
          <div className="login-form higherup">
            <br />
            <label>
              Username:
              <br />
              <input
                type="text"
                id="user_session_email"
                value={this.state.username}
                onChange={this.update("username")}
                className="login-input"
                style={{ fontSize: "24px" }}
              />
            </label>

            <br/>

            <label>
              Password:
              <br />
              <input
                type="password"
                id="user_session_password"
                value={this.state.password}
                onChange={this.update("password")}
                className="login-input"
                style={{ fontSize: "24px" }}
              />
            </label>

            <br />
            <br />

            <input className="orangebutton" type="submit" value="Log in" />
            {/* {this.props.formType} */} &nbsp;
            <button
              className="orangebutton"
              style={{ backgroundColor: `green` }}
              onClick={this.demoFill}
            >
              Demo Log in
            </button>
            <hr></hr>
            Or login with Facebook/
            <GoogleLogin
              clientId="23767328561-ndo3b9lpk03lr9kfind7ur4srslp3qrr.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
               
            /> IMPORTANT: works but is not secure yet

          </div>
        </form>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 680 91"
          class="w-full"
          style={{ position: `absolute`, bottom: `0`, left: `0` }}
        >
          <path fill="#ACE4D6" d="M349 76.499L286 113V40z" />
          <path fill="#0C3C32" d="M480 74.5L446 94V55z" />
          <path fill="#1CC29F" d="M223 76.5l63 36.5V40zm182 1.999L446 102V55z" />
          <path fill="#137863" d="M169 48v82l71-41z" />
          <path fill="#1CC29F" d="M121 75.499L169 103V48z" />
          <path fill="#373B3F" d="M456 101h-96V46z" />
          <path fill="#52595F" d="M360 46v55h-96z" />
          <path fill="#A473DB" d="M436 93h63V57z" />
          <path fill="#D0B3EB" d="M499 57v36h63z" />
          <path fill="#0C3C32" d="M491 93h84.18V44z" />
          <path fill="#1CC29F" d="M575.18 93h84.179l-84.18-49z" />
          <path fill="#FF2900" d="M601 94h48V66z" />
          <path fill="#FF692C" d="M649 66v28h48z" />
          <path fill="#FF815C" d="M170.385 93h76V49z" />
          <path fill="#FF2900" d="M246.385 49v44h76z" />
          <path fill="#373B3F" d="M166 93H70V38z" />
          <path fill="#52595F" d="M70 38v55h-96z" />
        </svg>
      </div>
    );
  }
}

export default LoginForm;
