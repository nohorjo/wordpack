import React, { Component } from 'react';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            wordsToLearn: +localStorage.getItem("wordsToLearn") || 10,
            wordsToTest: +localStorage.getItem("wordsToTest") || 10,
        };
    }

    render() {
        const { wordsToLearn, wordsToTest } = this.state;
        return (
            <div className="settings">
                <header>Settings</header>
                <span>Words to learn</span>
                <input
                    type="number"
                    value={wordsToLearn}
                    min={1}
                    onChange={({target:{value, min}}) => {
                        if (value >= min) {
                            localStorage.setItem('wordsToLearn', value);
                        }
                        this.setState({wordsToLearn: value});
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
