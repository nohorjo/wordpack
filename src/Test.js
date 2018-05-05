import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Switch,
    Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import styles from './Styles';

import { getWords, saveWords } from './Words';

const leftRightButtonSize = 50;
const enabledColour = "#007aff";
const disabledColour = "#7fbcff";

const MIN_WORDS = 1;

export default class Learn extends Component {
    constructor(props) {
        super(props);
        this.language = this.props.navigation.getParam("language");
        this.state = {
            showTranslation: false,
            cardIndex: 0,
            card: null,
            words: []
        };
        getWords(this.language).then(allWords => {
            this.allWords = allWords;
            const learned = allWords.filter(w => w.learned);
            if(learned.length < MIN_WORDS){
                Alert.alert(
                    'Not enough learned words',
                    `You need to mark more that ${MIN_WORDS} words as learned to take a test`,
                    [{text : 'OK', onPress : this.props.navigation.pop.bind(this)}]
                );
            } else {
                this.setState({
                    words : learned
                                .sort((a, b) => (b.weight || 0) * Math.random() 
                                              - (a.weight || 0) * Math.random())
                                .slice(0,10)
                });
            }
        });
    }
    render() {
        const first = this.state.cardIndex == 0;
        const last = this.state.cardIndex == this.state.words.length - 1;
        const card = this.state.words[this.state.cardIndex];
        return card ? (
            <View style={styles.root}>
                <View style={[styles.container, styles.card]}>
                    <Text style={styles.heading}>{card.word}</Text>
                    <View style={{flex : 4}}>
                        {Array(8).fill((<View style={{marginTop:5}}><Button title="x"/></View>))}
                    </View>
                </View>
                <View style={[styles.buttonContainer, styles.bottomButtons]}>
                    <View style={styles.leftButton}>
                        <Icon.Button
                            onPress={() => this.setState(prev => (!first && {
                                showTranslation: false,
                                cardIndex: --prev.cardIndex
                            }))}
                            name="chevron-with-circle-left"
                            size={leftRightButtonSize}
                            backgroundColor={first ? disabledColour : enabledColour}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Text>I know this word</Text>
                        <Switch
                            value={card.learned}
                            onValueChange={() => {
                                card.learned = !card.learned;
                                saveWords(this.allWords, this.language);
                                this.forceUpdate();
                            }}
                        />
                    </View>
                    <View style={styles.rightButton}>
                        <Icon.Button
                            onPress={() => this.setState(prev => (!last && {
                                showTranslation: false,
                                cardIndex: ++prev.cardIndex
                            }))}
                            name="chevron-with-circle-right"
                            size={leftRightButtonSize}
                            backgroundColor={last ? disabledColour : enabledColour}
                        />
                    </View>
                </View>
            </View>
        ) : (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
    }
};

