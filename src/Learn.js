import React, { Component } from 'react';

import {
    getWords,
    saveWords,
    getPhrases,
    savePhrases,
} from './Entities';
import { randomSort } from './utils';

import { Swipeable } from 'react-swipeable';

export default class Learn extends Component {

    constructor(props) {
        super(props);
        this.lang = props.match.params.lang;
        
        let get;

        if (props.match.params.entity === 'words') {
            get = getWords;
            this.save = saveWords;
            this.criteriaProp = 'weight';
            this.entityType = 'word';
        } else {
            get = getPhrases;
            this.save = savePhrases;
            this.criteriaProp = 'learned';
            this.entityType = 'phrase';
        }

        let showLang = localStorage.getItem('showLang');
        
        if (showLang === null) showLang = "true";
        showLang = showLang === "true";

        this.state = {
            entities: [],
            index: 0,
            showTranslation: false,
            showTransliteration: false,
            showLang,
        };

        get(this.lang).then(ws => {
            this._allEntities = ws;
            const entities = randomSort(
                ws.filter(w => !w[this.criteriaProp])
                    .slice(0, +localStorage.getItem('entitiesToLearn') || 10)
            );
            if (!entities.length) {
                alert(`You have learned all ${props.match.params.entity} in this list! Try testing yourself`);
                window.history.back();
            } else {
                this.setState({entities});
            }
        });
    }

    nextCard(index) {
        this.setState({
            index: index + 1,
            showTranslation: false,
            showTransliteration: false,
        });
    }

    previousCard(index) {
        this.setState({
            index: index - 1,
            showTranslation: false,
            showTransliteration: false,
        });
    }

    render() {
        const {
            entities,
            index,
            showTranslation,
            showTransliteration,
            showLang,
        } = this.state;
        const entity = entities[index];

        const showPick = [this.entityType, 'translation'];
        if (showLang) showPick.reverse();
        const [toShow, toHide] = showPick;

        return entity ? (
            <Swipeable
                onSwipedLeft={() => index !== entities.length - 1 && this.nextCard(index)}
                onSwipedRight={() => index && this.previousCard(index)}
            >
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
                        className="mainEntity"
                    >
                        {entity[toShow]}
                    </span>
                        <span
                            className="trans"
                            onClick={() => this.setState({showTranslation: true})}
                        >
                            {showTranslation ? entity[toHide] : "Show translation"}
                        </span>
                        {entity.transliteration && (
                            <span
                                className="trans"
                                onClick={() => this.setState({showTransliteration: true})}
                            >
                                {showTransliteration ? entity.transliteration : "Show transliteration"}
                            </span>
                        )}
                    <div className="controls">
                        <input
                            type="button"
                            value="Previous"
                            disabled={!index}
                            onClick={() => this.previousCard(index)}
                        />
                        <span
                            onClick={() => {
                                entity[this.criteriaProp] = entity[this.criteriaProp] ? 0 : 5;
                                this.save(this._allEntities, this.lang);
                                this.forceUpdate();
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={entity[this.criteriaProp]}
                            />
                            Learned
                        </span>
                        <input
                            type="button"
                            value="Next"
                            disabled={index === entities.length - 1}
                            onClick={() => this.nextCard(index)}
                        />
                    </div>
                </div>
            </Swipeable>
        ) : (
            <div />
        );
    }

};
