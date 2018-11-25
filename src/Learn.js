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
            <div>
                {word.word}
                {showTranslation ? word.translation : (
                    <span
                        onClick={() => this.setState({showTranslation: true})}
                    >
                        Show translation
                    </span>
                )}
                Learned
                <input
                    type="checkbox"
                    checked={word.weight}
                    onChange={() => {
                        word.weight = word.weight ? 0 : 1;
                        saveWords(this._allWords, this.lang);
                        this.forceUpdate();
                    }}
                />
                <input
                    type="button"
                    value="Previous"
                    onClick={() => index && this.setState({
                        index: index - 1,
                        showTranslation: false,
                    })}
                />
                <input
                    type="button"
                    value="Next"
                    onClick={() => index < words.length - 1 && this.setState({
                        index: index + 1,
                        showTranslation: false,
                    })}
                />
            </div>
        ) : (
            <div />
        );
    }

};
