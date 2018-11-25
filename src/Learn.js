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
        } = this.state;
        const word = words[index];

        return word ? (
            <div className="learn">
                <span>{word.word}</span>
                    <span
                        onClick={() => this.setState({showTranslation: true})}
                    >
                        {showTranslation ? word.translation : "Show translation"}
                    </span>
                <div className="controls">
                    <input
                        type="button"
                        value="Previous"
                        disabled={!index}
                        onClick={() => this.setState({
                            index: index - 1,
                            showTranslation: false,
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
                        })}
                    />
                </div>
            </div>
        ) : (
            <div />
        );
    }

};
