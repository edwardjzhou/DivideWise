import React, { Component } from "react";
// from https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      username: "",
      password: "",
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

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

  render() {
    return (
      <div>
        <button
          className="orangebutton"
          style={{ backgroundColor: `#48BE9D` }}
          onClick={this.showMenu}
        >
          Log in
        </button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={(element) => {
              this.dropdownMenu = element;
            }}
            style={{
              backgroundColor: `rgb(238,238,238)`,
              borderBottomLeftRadius: `5px`,
              borderBottomRightRadius: `5px`,
              boxShadow: `0 1px 4px rgba(0, 0, 0, 0.4)`,
            }}
          >
            <form onSubmit={this.handleSubmit} className="login-form-box2">
              <div className="login-form2">
                <br />

                <input
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.update("username")}
                  className="login-input"
                  style={{ margin: `5px` }}
                />
                <br />

                <input
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.update("password")}
                  className="login-input"
                  style={{ margin: `5px` }}
                />
                <br />
                <input
                  style={{
                    transform: `scale(0.75)`,
                    margin: `0 0 0 0`,
                    backgroundColor: `#48BE9D`,
                  }}
                  className="session-submit orangebutton"
                  type="submit"
                  value={`Log in to Dividewise`}
                />
              </div>
            </form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Card;
