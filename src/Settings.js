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
                <span>Progress export</span>
                <input type="button" onClick={() => {
                    const data = {},
                        keys = Object.keys(localStorage);

                    for (let key of keys) {
                        data[key] = localStorage.getItem(key);
                    }
                    const filename = 'progress.json';
                    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
                    if (window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveBlob(blob, filename);
                    } else {
                        const elem = window.document.createElement('a');
                        elem.href = window.URL.createObjectURL(blob);
                        elem.download = filename;
                        document.body.appendChild(elem);
                        elem.click();
                        document.body.removeChild(elem);
                    }
                }} value="Export"/>
                <span>Progress import</span>
                <input type="file" onChange={e => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const data = JSON.parse(reader.result);
                        Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
                    };
                    reader.readAsText(e.target.files[0]);
                }}/>
            </div>
        );
    }

}

