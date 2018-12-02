import React from 'react';
import { StyleSheet, Text, View, Image, WebView, AppRegistry } from 'react-native';
import App2 from './exampleBis/App2'
import data from './json/news.js';
import NfcManager, {Ndef} from 'react-native-nfc-manager';

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      supported: true,
      enabled: false,
      isWriting: false,
      //urlToWrite: 'https://www.google.com',
      //rtdType: RtdType.URL,
      parsedText: null,
      tag: {},
      // End NFC
      news: [],
      isPlayer : true,
      showNews : true
    }
  }

  componentDidMount(){
    console.log('Did Mont');
    if ( typeof (NfcManager) !== 'undefined') {
      NfcManager.isSupported()
        .then(supported => {
            this.setState({ supported });
            if (supported) {
                this._startNfc();
            } else {
              console.log('not supported');
            }
        })
    }
    

   var res = data.news;
   var indice = getNews();
   this.setState({ news : res[indice]});
   this.setState({
    IdNews: res[0].IdNews,
    title: res[0].title,
    shortDesc: res[0].shortDescription,
    desc: res[0].description,
    bonus: res[0].bonus,
    malus: res[0].malus
  });
    // Manage NFC
    //AppRegistry.registerComponent('NfcManagerDev', () => App2);

    function getNews(){
      return 0;
    }
  }

  _startNfc() {
    NfcManager.start({
        onSessionClosedIOS: () => {
            console.log('ios session closed');
        }
    })
        .then(result => {
            console.log('start OK', result);
        })
        .catch(error => {
            console.warn('start fail', error);
            this.setState({supported: false});
        })
  }

  render() {
    return (
      
      <View style={styles.container}>
      {this.state.isPlayer === true ?
        <View>
        <Text style={styles.text}>{this.state.supported}</Text>
        <Text style={styles.text}>{this.state.news.shortDescription}</Text>
        <Text style={styles.text}>{this.state.news.description}</Text>
        <Text style={styles.text}>{this.state.news.bonus}</Text>
        <Text style={styles.text}>{this.state.news.malus}</Text>
        </View>
        :
        <Text></Text>
      }
      {this.state.showNews === true ?
        <View>
        <Text style={styles.text}>{this.state.news.title}</Text>
        <Text style={styles.text}>{this.state.news.shortDescription}</Text>
        <Text style={styles.text}>{this.state.news.description}</Text>
        <Text style={styles.text}>{this.state.news.bonus}</Text>
        <Text style={styles.text}>{this.state.news.malus}</Text>
        </View>
        :
        <Text></Text>
      }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
