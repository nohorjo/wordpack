import React, { Component } from 'react';

import { getWords, saveWords } from './Words';
import { randomSort } from './utils';

const WORDS_COUNT = 10;

export default class Learn extends Component {

    constructor(props) {
        super(props);
        this.lang = props.match.params.lang;
        this.state = {
            words: [],
            index: 0,
            showTranslation: false,
            showTransliteration: false,
            showLang: false,
        };
        getWords(this.lang).then(ws => {
            this._allWords = ws;
            const words = ws.filter(w => !w.weight)
                            .slice(0, WORDS_COUNT)
                            .sort(randomSort);
            this.setState({words});
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
                <span>
                    <input
                        type="checkbox"
                        checked={showLang}
                        onChange={() => this.setState({showLang: !showLang})}
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
                    <span>
                        <input
                            type="checkbox"
                            checked={word.weight}
                            onChange={() => {
                                word.weight = word.weight ? 0 : 1;
                                saveWords(this._allWords, this.lang);
                                this.forceUpdate();
                            }}
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
