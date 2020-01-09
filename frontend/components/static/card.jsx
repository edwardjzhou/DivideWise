import React, { Component } from 'react';
// from https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
class Card extends Component {
    constructor() {
        super();

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
                                <button> Username: </button>
                                <button> Menu item 2 </button>
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