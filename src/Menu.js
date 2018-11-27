import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    listLanguages,
    getProgess,
} from './Words';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            lastLang: localStorage.getItem('lastLang'),
        };
        listLanguages().then(languages => this.setState({ languages }));
    }

    render() {
        const { languages, lastLang } = this.state;
        languages.sort((a, b) => a === lastLang ? -1 : b === lastLang ? 1 : a.localeCompare(b));
        return (
            <div className="menu">
                <Link to="/settings">
                    <img
                        id="settingsicon"
                        src="/settings.svg"
                        alt="settings"
                    />
                </Link>
                <header>Menu</header>
                {languages.map(lang => (
                    <div
                        key={`lang_${lang}`}
                        className="menuItem"
                        onClick={() => {
                            localStorage.setItem('lastLang', lang);
                            this.setState({lastLang: lang});
                        }}
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
