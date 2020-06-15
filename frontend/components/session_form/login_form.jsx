import React from "react";
import NavBar from "../static/navbar";
import { GoogleLogin } from 'react-google-login';
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
// FadeLoader		
// HashLoader	
const override = css`
  display: block;
  margin: 0
  border-color: red;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;





class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoFill = this.demoFill.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this)
  }


  responseGoogle(response) {
    this.props.edwardAUTH(response.tokenId, response.profileObj.email)
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
      // loading: true,
    }, ()=> {
      const { username, password } = this.state;
      setTimeout(this.props.processForm.bind({}, { username, password }), 0);
    }
    );
  }

  render() {
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
          <div className="welcome">WELCOME TO DIVIDEWISE</div>
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
            <hr />
            Or login with
            <GoogleLogin
              clientId="23767328561-ndo3b9lpk03lr9kfind7ur4srslp3qrr.apps.googleusercontent.com"
              buttonText="Google"
              onSuccess={this.responseGoogle}
              onFailure={()=>alert(`you closed the react-google-login login page`)}
              // onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
               
            /> 
        
  

           <HashLoader
              css={override}
              size={150}
              color={"green"}
              // loading={this.state.loading}
              loading={this.props.attempting_login}
            />


      



          </div>  
        </form>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 680 91"
          className="w-full"
          style={{ position: `absolute`, bottom: `0`, left: `0`, pointerEvents: `none` }}
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
