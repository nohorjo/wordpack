import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/Entypo';

import styles from './Styles';

const leftRightButtonSize = 50;

export default class Learn extends Component {
    constructor(props) {
        super(props);
        this.language = this.props.navigation.getParam("language");
    }
    render() {
        return (
            <View style={styles.root}>
                <Text>Learn {this.language.title}</Text>
                <View style={[styles.buttonContainer, styles.bottomButtons]}>
                    <View style={styles.leftButton}>
                        <Icon.Button
                            onPress={() => { }}
                            name="chevron-with-circle-left"
                            size={leftRightButtonSize}
                        />
                    </View>
                    <View style={styles.rightButton}>
                        <Icon.Button
                            onPress={() => { }}
                            name="chevron-with-circle-right"
                            size={leftRightButtonSize}
                        />
                    </View>
                </View>
            </View>
        );
    }
};