import React, { Component } from 'react';
// from https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
            username: '',
            password: ''
        };

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    
    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
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
                    <li key={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <button onClick={this.showMenu}>
                    Log in
                </button>

                {
                    this.state.showMenu
                        ? (
                            <div
                                className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                                    <form onSubmit={this.handleSubmit} className="login-form-box">
                                                        <div className="login-form">
                                                            <br />
                                                            <label>Username:
                                                <input type="text"
                                                                    value={this.state.username}
                                                                    onChange={this.update('username')}
                                                                    className="login-input"
                                                                />
                                                            </label>
                                                            <br />
                                                            
                                                            <label>Password:
                                                <input type="password"
                                                                    value={this.state.password}
                                                                    onChange={this.update('password')}
                                                                    className="login-input"
                                                                />
                                                            </label>
                                                            <br />
                                                            <input className="session-submit" type="submit" value={this.props.formType} />
                                                        </div>
                                                    </form>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}

export default Card