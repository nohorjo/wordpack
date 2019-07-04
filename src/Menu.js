import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    listLanguages,
    getProgess,
    averageScore,
} from './Entities';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            lastLang: localStorage.getItem('lastLang') || '',
        };
        listLanguages().then(languages => this.setState({ languages }));
    }

    render() {
        const { languages, lastLang } = this.state;
        const sortedLangs = [...new Set([
            ...lastLang.split(','),
            ...languages.sort((a, b) => a.localeCompare(b)),
        ])].filter(l => l);

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
                {sortedLangs.map(lang => (
                    <div
                        key={`lang_${lang}`}
                        className="menuItem"
                        onClick={() => {
                            localStorage.setItem('lastLang', [...new Set(`${lang},${lastLang}`.split(','))].join());
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
                            <Link to={`/learn/words/${lang}`}>Learn</Link>
                            <Link to={`/test/${lang}`}>Test</Link>
                            <Link to={`/learn/phrases/${lang}/`}>Phrases</Link>
                        </div>
                        <sub>Average score: {averageScore(lang) || 0}</sub>
                    </div>
                ))}
            </div>
        );
    }
}
