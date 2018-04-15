import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Switch
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import styles from './Styles';

import mock from './mock';

const leftRightButtonSize = 50;
const enabledColour = "#007aff";
const disabledColour = "#7fbcff";


export default class Learn extends Component {
    constructor(props) {
        super(props);
        this.language = this.props.navigation.getParam("language");
        this.words = mock.words.filter(w => !w.learned);
        this.state = {
            showTranslation: false,
            cardIndex: 0,
            card: this.words[0]
        };
    }
    render() {
        const first = this.state.cardIndex == 0;
        const last = this.state.cardIndex == this.words.length - 1;
        const card = this.words[this.state.cardIndex];
        return (
            <View style={styles.root}>
                <View style={[styles.container, styles.card]}>
                    <Text style={styles.heading}>{card.word}</Text>
                    <TouchableOpacity onPress={() => this.setState(prev => (!prev.showTranslation && { showTranslation: !prev.showTranslation }))}>
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
                                this.setState(prev => {
                                    card.learned = !card.learned;
                                    return prev;
                                })
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
        );
    }
};