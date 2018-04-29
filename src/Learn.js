import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Switch
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import styles from './Styles';

import { getWords, saveWords } from './Words';

const leftRightButtonSize = 50;
const enabledColour = "#007aff";
const disabledColour = "#7fbcff";


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
        getWords(this.language).then(words => this.setState({
            words: words.filter(w => !w.learned)
        }))
    }
    render() {
        const first = this.state.cardIndex == 0;
        const last = this.state.cardIndex == this.state.words.length - 1;
        const card = this.state.words[this.state.cardIndex];
        return card ? (
            <View style={styles.root}>
                <View style={[styles.container, styles.card]}>
                    <Text style={styles.heading}>{card.word}</Text>
                    <TouchableOpacity onPress={() => this.setState(prev => (!prev.showTranslation && { showTranslation: true }))}>
                        <Text>{this.state.showTranslation ? card.translation : "Tap to show translation"}</Text>
                    </TouchableOpacity>
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
                                saveWords(this.state.words, this.language);
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
