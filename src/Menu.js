import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { listLanguages } from './Words';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {languages: []};
        listLanguages().then(languages => this.setState({ languages }));
    }

    renderLanguageButtons() {
        return this.state.languages.map(lang => (
            <div
                key={`lang_${lang}`}
            >
                {lang}
                <Link to={`/learn/${lang}`}>Learn</Link>
                <Link to={`/test/${lang}`}>Test</Link>
            </div>
        ));
    }

    render() {
        return (
            <div>
                {this.renderLanguageButtons()}
            </div>
        );
    }
}
