import React, { Component } from 'react';
import {
    Text,
} from 'react-native';
  
export default class Test extends Component {
    constructor(props) {
        super(props);
        this.language = this.props.navigation.getParam("language");
    }
    render() {
        return <Text>Test {this.language.title}</Text>;
    }
};