import React, { Component } from 'react';

import { getWords, saveWords } from './Entities';
import { randomSort } from './utils';

export default class Learn extends Component {

    constructor(props) {
        super(props);
        this.wordsToTest = +localStorage.getItem("wordsToTest") || 10;
        this.testOptionsCount = Math.min(+localStorage.getItem("testOptionsCount") || 10, this.wordsToTest);
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
            let toShow = 'translation';
            let toTest = 'word';
            if (this.lang !== 'classical arabic') {
                const picks = ["word", "translation"];
                if (word.transliteration) picks.push('transliteration');
                ([toShow, toTest] = randomSort(picks));
            }

            const choices = [word];

            do {
                const choice = words[Math.random() * this.wordsToTest | 0];
                if (choices.every(c => c.translation !== choice.translation)) {
                    choices.push(choice);
                }
            } while (choices.length < this.testOptionsCount);

            return (
                <div className="test">
                    <span>{word[toShow]}</span>
                    <div className="options">
                        {randomSort(choices).map((option, i) => (
                            <span
                                className="button"
                                key={`test_option_${i}`}
                                onClick={() => {
                                    if (option === word) {
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
                        >{option[toTest]}</span>
                        ))}
                    </div>
                    <span>Question {index + 1} of {this.wordsToTest}</span>
                </div>
            );
        } else {
            return (<div />);
        }
    }

};

