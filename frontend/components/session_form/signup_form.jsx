import React from 'react';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            maxHeight: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.maxFormHeight = this.maxFormHeight.bind(this);

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

    maxFormHeight(){
        this.setState({maxHeight:300})
    }


    render() {
        // let styles = {'max-height': this.state.maxHeight+'px'}
        const maxHeight = { maxHeight: this.state.maxHeight };


        return (
            <div className="signup-form-container">
                <form onSubmit={this.handleSubmit} className="signup-form-box">
                    <div className='welcome'>INTRODUCE YOURSELF</div>
                    <br />
                   
                    {/* Please {this.props.formType} or {this.props.navLink} */}
                    <div className="signup-form" id="slideout">
                        <br />
                        <label>  Hi there! My name is
                            <input type="text"
                                value={this.state.username}
                                onChange={this.update('username')}
                                className="signup-input"
                                onClick={()=>this.maxFormHeight()}
                            />
                        </label>
                        <div id="slideout-inner" className="slideout" 
                         style={maxHeight} 
                        >
                                <br />
                                <label>Here's my email address:
                                    <input type="text"
                                        value={this.state.email}
                                        onChange={this.update('email')}
                                        className="signup-input"
                                    />
                                </label>

                                <br />
                                <label> And here's my password:
                                    <input type="password"
                                        value={this.state.password}
                                        onChange={this.update('password')}
                                        className="signup-input"
                                    />
                                </label>
                                <br />
                                <input className="session-submit" type="submit" value="Sign me up!" />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignupForm;
