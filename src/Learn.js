import React, { Component } from 'react';

import { getWords, saveWords } from './Words';
import { randomSort } from './utils';

export default class Learn extends Component {

    constructor(props) {
        super(props);
        this.lang = props.match.params.lang;
        let showLang = localStorage.getItem('showLang');
        
        if (showLang === null) showLang = "true";
        showLang = showLang === "true";

        this.state = {
            words: [],
            index: 0,
            showTranslation: false,
            showTransliteration: false,
            showLang,
        };
        getWords(this.lang).then(ws => {
            this._allWords = ws;
            const words = ws.filter(w => !w.weight)
                            .slice(0, +localStorage.getItem('wordsToLearn') || 10)
                            .sort(randomSort);
            if (!words.length) {
                alert('You have learned all words in this list! Try testing yourself');
                window.history.back();
            } else {
                this.setState({words});
            }
        });
    }

    render() {
        const {
            words,
            index,
            showTranslation,
            showTransliteration,
            showLang,
        } = this.state;
        const word = words[index];

        const showPick = ['word', 'translation'];
        if (showLang) showPick.reverse();
        const [toShow, toHide] = showPick;

        return word ? (
            <div className="learn">
                <span
                    onClick={() => {
                        this.setState({showLang: !showLang});
                        localStorage.setItem('showLang', !showLang);
                    }}
                >
                    <input
                        type="checkbox"
                        checked={showLang}
                    />
                    Show {this.lang}
                </span>
                <span
                    className="mainWord"
                >
                    {word[toShow]}
                </span>
                    <span
                        className="trans"
                        onClick={() => this.setState({showTranslation: true})}
                    >
                        {showTranslation ? word[toHide] : "Show translation"}
                    </span>
                    {word.transliteration && (
                        <span
                            className="trans"
                            onClick={() => this.setState({showTransliteration: true})}
                        >
                            {showTransliteration ? word.transliteration : "Show transliteration"}
                        </span>
                    )}
                <div className="controls">
                    <input
                        type="button"
                        value="Previous"
                        disabled={!index}
                        onClick={() => this.setState({
                            index: index - 1,
                            showTranslation: false,
                            showTransliteration: false,
                        })}
                    />
                    <span
                        onClick={() => {
                            word.weight = word.weight ? 0 : 5;
                            saveWords(this._allWords, this.lang);
                            this.forceUpdate();
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={word.weight}
                        />
                        Learned
                    </span>
                    <input
                        type="button"
                        value="Next"
                        disabled={index === words.length - 1}
                        onClick={() => this.setState({
                            index: index + 1,
                            showTranslation: false,
                            showTransliteration: false,
                        })}
                    />
                </div>
            </div>
        ) : (
            <div />
        );
    }

};
