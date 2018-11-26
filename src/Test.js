import React, { Component } from 'react';

import { getWords, saveWords } from './Words';
import { randomSort } from './utils';

const MIN_WORDS = 10;

export default class Learn extends Component {

    constructor(props) {
        super(props);
        this.lang = props.match.params.lang;
        this.state = {
            words: [],
            index: 0,
            score: 0,
        };
        getWords(this.lang).then(ws => {
            this._allWords = ws;
            const words = ws.filter(w => w.weight)
                            .sort((a, b) => -(a.weight * Math.random() - (b.weight * Math.random())))
                            .slice(0, MIN_WORDS);
            if (words.length < MIN_WORDS) {
                alert(`Not enough words. You need to learn ${MIN_WORDS - words.length} more`);
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
            score,
        } = this.state;

        const word = words[index];

        if (index === MIN_WORDS) {
            setTimeout(() => window.history.back(), 2500);
            return (
                <div
                    className="score"
                >
                    Score: {score} out of {MIN_WORDS}
                </div>
            );
        } else if (word) {
            const picks = ["word", "translation"];
            if (word.transliteration) picks.push('transliteration');
            const [toShow, toTest] = picks.sort(randomSort);
            const choices = new Set([index]);

            do {
                choices.add(Math.random() * MIN_WORDS | 0);
            } while (choices.size < MIN_WORDS);        

            return (
                <div className="test">
                    <span>{word[toShow]}</span>
                    {[...choices].sort(randomSort).map(i => (
                        <input
                            key={`test_option_${i}`}
                            type="button"
                            value={words[i][toTest]}
                            onClick={() => {
                                if (i === index) {
                                    word.weight++;
                                    this.setState({
                                        score: score + 1,
                                    });
                                } else {
                                    let alertMessage = `Correct answer: ${word[toTest]}`;
                                    if (!--word.weight) alertMessage += ". This word will be placed back in the learn group";
                                    alert(alertMessage);
                                }
                                saveWords(this._allWords, this.lang);
                                this.setState({
                                    index: index + 1,
                                });
                            }}
                        />
                    ))}
                    <span>Question {index + 1} of {MIN_WORDS}</span>
                </div>
            );
        } else {
            return (<div />);
        }
    }

};

