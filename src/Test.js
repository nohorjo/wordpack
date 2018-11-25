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
                            .sort((a, b) => (a.weight * Math.random() - (b.weight * Math.random())))
                            .slice(0, MIN_WORDS);
            if (words.length < MIN_WORDS) {
                alert(`Not enough words. You need to learn ${MIN_WORDS - words.length} more`);
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
            return (
                <div
                    className="score"
                >
                    Score: {score} out of {MIN_WORDS}
                </div>
            );
        } else if (word) {
            const [toShow, toTest] = ["word", "translation"].sort(randomSort);
            const choices = new Set([index]);

            do {
                choices.add(Math.random() * MIN_WORDS | 0);
            } while (choices.size < MIN_WORDS);        

            return (
                <div className="test">
                    <span>{word[toShow]}</span>
                    {[...choices].sort(randomSort).map(i => (
                        <input
                            type="button"
                            value={words[i][toTest]}
                            onClick={() => {
                                const correct = i === index;
                                if (correct) {
                                    word.weight++;
                                    this.setState({
                                        score: score + 1,
                                    });
                                    saveWords(this._allWords, this.lang);
                                } else {
                                    alert(word[toTest]);
                                }
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

