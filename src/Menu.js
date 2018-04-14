import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import mock from './mock';

let navigate;

const laguageButtons = lang => (
  <View key={lang.title} style={styles.languageButtonView}>
    <Text style={styles.languageTitle}>{lang.title}</Text>
    <View style={styles.languageButtonContainer}>
      <View style={styles.languageButton}>
        <Button
          title="Learn"
          onPress={navigate.bind(null, "Learn", { language: lang })}
        />
      </View>
      <View style={styles.languageButton}>
        <Button
          title="Test"
          onPress={navigate.bind(null, "Test", { language: lang })}
        />
      </View>
    </View>
  </View>
);

export default class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    ({ navigate } = this.props.navigation);
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Hello</Text>
        <View style={styles.languageButtonList}>{mock.languages.sort((lang1, lang2) => {
          if (lang1.title < lang2.title)
            return -1
          if (lang1.title > lang2.title)
            return 1
          return 0
        }).map(lang => laguageButtons(lang))}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    flex: 1,
    fontSize: 24,
    marginTop: 40
  },
  languageButton: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5
  },
  languageButtonList: {
    flex: 7,
    minWidth: 400
  },
  languageButtonView: {
    marginBottom: 20,
    alignItems: 'center',
  },
  languageButtonContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10
  },
  languageTitle: {
    fontSize: 20
  }
});
