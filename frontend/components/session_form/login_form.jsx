import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            <div className="login-form-container">
                <form onSubmit={this.handleSubmit} className="login-form-box">
                    <img src={`${window.logoURL}`} alt="Logo square" className="login_logo" width="200" height="200" />

                    <div className='welcome'>WELCOME TO DIVIDEWISE</div>
                    <br />  
                    {/* Please {this.props.formType} or {this.props.navLink} */}

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
        );
    }
}

export default LoginForm;
