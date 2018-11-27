import React, { Component } from 'react';

export default class Menu extends Component {

    render() {
        return (
            <div className="settings">
                <header>Settings</header>
                <span>Reset application</span>
                <input
                    className="red"
                    type="button"
                    onClick={() => {
                        localStorage.clear();
                        window.history.back();
                    }}
                    value="Reset"
                />
            </div>
        );
    }

}
