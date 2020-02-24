import React, { Component } from 'react';
import { connect } from 'react-redux';

// from https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
class LogoutCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
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

    render() {
        return (
            <div style={{marginTop : `10px`}}>
                <a className="parentHover" style={{ marginTop: `8px`, backgroundColor: ``, margin: `0 0 0 0`, padding: `0 0 0 0` }} onClick={this.showMenu}>
                    <img style={{width: `22px`,
                    height: `22px`,
                    border: `1px solid #3eaf8f`,
                    background: `#3eaf8f`,
                    borderRadius: `12px`,
                    marginTop: `0px`,
                    marginRight: '2px'}}
                    src={window.greendude} width="auto" height="100%">
                    </img> 
                    {this.props.name} <span class="caret"></span>
                </a>

                {
                    this.state.showMenu
                        ? (
                            <div className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >

                                <input style={{ color: `black`, backgroundColor: 'white', 
                                width: `auto`, transform: `scale(0.65)`, margin: `0 0 0 0` , padding: `0 30px 0 30px`, zIndex: `100`,
                                 }} className="session-submit orangebutton" 
                                type="submit" value="Log out" onClick={this.props.logout} />
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

const mSTP = (state) => {
    return {

    }
}

const mDTP = (dispatch) => {
    return {
        processForm: (user) => dispatch(logout(user)),
    }
}

export default connect(mSTP, mDTP)(LogoutCard)