import React, { Component } from 'react';

import { getWords, saveWords } from './Entities';
import { randomSort } from './utils';

export default class Learn extends Component {

    constructor(props) {
        super(props);
        this.wordsToTest = +localStorage.getItem("wordsToTest") || 10;
        this.testOptionsCount = +localStorage.getItem("testOptionsCount") || 10;
        this.lang = props.match.params.lang;
        this.state = {
            words: [],
            index: 0,
            score: 0,
        };
        getWords(this.lang).then(ws => {
            this._allWords = ws;
            const words = ws.filter(w => w.weight)
                            .sort((a, b) => a.weight * Math.random() - (b.weight * Math.random()))
                            .slice(0, this.wordsToTest);
            if (words.length < this.wordsToTest) {
                alert(`Not enough words. You need to learn ${this.wordsToTest - words.length} more`);
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

        if (index === this.wordsToTest) {
            const hash = window.location.hash;
            setTimeout(() => hash === window.location.hash && window.history.back(), 2500);
            return (
                <div
                    className="score"
                >
                    Score: {score} out of {this.wordsToTest}
                </div>
            );
        } else if (word) {
            const picks = ["word", "translation"];
            if (word.transliteration) picks.push('transliteration');
            const [toShow, toTest] = randomSort(picks);
            let choices;

            do {
                choices = new Set([index]);

                do {
                    choices.add(Math.random() * this.wordsToTest | 0);
                } while (choices.size < this.testOptionsCount);
            } while (!choices.has(index))

            return (
                <div className="test">
                    <span>{word[toShow]}</span>
                    {randomSort([...choices]).map(i => (
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
                    <span>Question {index + 1} of {this.wordsToTest}</span>
                </div>
            );
        } else {
            return (<div />);
        }
    }

};

