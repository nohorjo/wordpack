import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';

import styles from './Styles';
import { listLanguages } from './Words';

let navigate;

const laguageButtons = lang => (
  <View key={lang.title} style={styles.languageButtonView}>
    <Text style={styles.languageTitle}>{lang.title}</Text>
    <View style={styles.buttonContainer}>
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
    this.state = { languages: [] }
    listLanguages.then(languages => {
      this.setState({ languages: languages });
    });
  }

  render() {
    ({ navigate } = this.props.navigation);
    return (
      <View style={[styles.container, styles.root]}>
        <Text style={styles.heading}>Hello</Text>
        <View style={styles.languageButtonList}>{this.state.languages.sort((lang1, lang2) => {
          if (lang1 < lang2)
            return -1
          if (lang1 > lang2)
            return 1
          return 0
        }).map(lang => laguageButtons(lang))}</View>
      </View>
    );
  }
}
