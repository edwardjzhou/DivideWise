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
        if(this.dropdownMenu != null){
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
        }
    }

    render() {
        return (
            <div>
            <div className="parentHover" style={{ paddingTop: `0px`, paddingBottom: `0`, height:`100%`, }} onClick={this.showMenu}>
                <a style={{ marginTop: `16px`, backgroundColor: ``, margin: `0 0 0 0`, padding: `0 0 0 0` ,
                 position: `relative`,
                bottom: `-25%`,
                transform: `translateY(-50%)`
               }} >
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
            </div>
                {
                    this.state.showMenu
                        ? (
                            <div className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >

                                <input style={{ 
                                width: `auto`, transform: `scale(0.65)`, margin: `0 0 0 0` , padding: `0 30px 0 30px`, zIndex: `100`,
                                 }} className="session-submit orangebutton dashcard" 
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