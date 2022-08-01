import React, { Component, useEffect, useState } from 'react';

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
            showHint: false,
        };
        getWords(this.lang).then(ws => {
            this._allWords = ws;
            const words = randomSort(ws.filter(w => w.weight))
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
            showHint,
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
            let hint;
            if (this.lang === 'classical arabic') {
                hint = 'transliteration';
            } else {
                const picks = ['word', 'translation'];
                if (word.transliteration) picks.push('transliteration');
                ([toShow, toTest] = randomSort(picks));
                hint = picks[2];
            }


            return (
                <div className="test">
                    <span
                        onClick={() => {
                            this.setState({showHint: true});
                            setTimeout(() => this.setState({showHint: false}), 3000);
                        }}
                    >{word[hint && showHint ? hint : toShow]}</span>
                    <Options
                        words={words}
                        word={word}
                        toTest={toTest}
                        toShow={toShow}
                        wordsToTest={this.wordsToTest}
                        testOptionsCount={this.testOptionsCount}
                        lang={this.lang}
                        allWords={this._allWords}
                        next={isCorrect => {
                            this.setState({
                                index: index + 1,
                                score: score + +isCorrect,
                                showHint: false,
                            });
                        }}
                    ></Options>
                    <span>Question {index + 1} of {this.wordsToTest}</span>
                </div>
            );
        } else {
            return (<div />);
        }
    }

};

function Options({words, word, next, toTest, toShow, wordsToTest, testOptionsCount, lang, allWords}) {
    const [choices, setChoices] = useState([]);
    useEffect(() => {
        let _choices = [word];

        do {
            const choice = words[Math.random() * wordsToTest | 0];
            if (_choices.every(c => (
                c.translation !== choice.translation
                && c.word !== choice.word
            ))) {
                _choices.push(choice);
            }
        } while (_choices.length < testOptionsCount);

        // sort from shortest to longest choice
        _choices.sort((a, b) => a[toTest].length - b[toTest].length);

        // Cut in half and randomise each half
        const left = randomSort(_choices.splice(0, _choices.length / 2));
        const right = randomSort([..._choices]);
        _choices = [];

        // zip the two back together to optimise column widths
        right.forEach((r, i) => {
            _choices.push(r);
            const l = left[i];
            if (l) {
                _choices.push(l);
            }
        });

        setChoices(_choices);
    }, [testOptionsCount, toTest, word, words, wordsToTest]);

    return (
        <div className="options">
            {choices.map((option, i) => (
                <span
                    className="button"
                    key={`test_option_${i}`}
                    onClick={() => {
                        let isCorrect = false;
                        if (option === word) {
                            word.weight++;
                            isCorrect = true;
                        } else {
                            let alertMessage = `You picked "${option[toTest]}", which is "${option[toShow]}".\nCorrect answer: ${word[toTest]}`;
                            if (!--word.weight) alertMessage += "\nThis word will be placed back in the learn group";
                            alert(alertMessage);
                        }
                        saveWords(allWords, lang);
                        next(isCorrect);
                    }}
            >{option[toTest]}</span>
            ))}
        </div>
    );
}

