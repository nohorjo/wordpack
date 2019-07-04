import React, { Component } from 'react';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entitiesToLearn: +localStorage.getItem("entitiesToLearn") || 10,
            wordsToTest: +localStorage.getItem("wordsToTest") || 10,
        };
    }

    render() {
        const { entitiesToLearn, wordsToTest } = this.state;
        return (
            <div className="settings">
                <header>Settings</header>
                <span>Words or phrases to learn</span>
                <input
                    type="number"
                    value={entitiesToLearn}
                    min={1}
                    onChange={({target:{value, min}}) => {
                        if (value >= min) {
                            localStorage.setItem('entitiesToLearn', value);
                        }
                        this.setState({entitiesToLearn: value});
                    }}
                />
                <span>Words to test</span>
                <input
                    type="number"
                    value={wordsToTest}
                    min={2}
                    onChange={({target:{value, min}}) => {
                        if (value >= min) {
                            localStorage.setItem('wordsToTest', value);
                        }
                        this.setState({wordsToTest: value});
                    }}
                />
                <span>Reset application</span>
                <input
                    className="red"
                    type="button"
                    onClick={() => {
                        if (window.confirm("Are you sure you want to delete all data and reset the application?")) {
                            localStorage.clear();
                            window.history.back();
                        }
                    }}
                    value="Reset"
                />
            </div>
        );
    }

}
