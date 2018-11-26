import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    listLanguages,
    getProgess,
} from './Words';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {languages: []};
        listLanguages().then(languages => this.setState({ languages }));
    }

    render() {
        return (
            <div className="menu">
                <header>Menu</header>
                {this.state.languages.map(lang => (
                    <div
                        key={`lang_${lang}`}
                        className="menuItem"
                    >
                        <hr
                            className="progressBar"
                            style={{
                                width: `${getProgess(lang)}%`,
                            }}
                        />
                        <div
                            className="langName"
                        >
                            {lang}
                        </div>
                        <div
                            className="buttonsContainer"
                        >
                            <Link to={`/learn/${lang}`}>Learn</Link>
                            <Link to={`/test/${lang}`}>Test</Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
