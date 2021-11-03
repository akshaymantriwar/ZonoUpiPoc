import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  NativeModules,
  Image,
} from 'react-native';
import RNAndroidInstalledApps from 'react-native-android-installed-apps-unblocking';

const UPI = NativeModules.UPI;
const upiApps = ['PhonePe', 'Paytm', 'GPay'];

export default class App extends Component<any, {amount: string; apps: any[]}> {
  constructor(props: any) {
    super(props);
    this.state = {amount: '', apps: []};
    RNAndroidInstalledApps.getNonSystemApps()
      .then((apps: any[]) => {
        return this.setState({
          apps: apps
            .filter(a => upiApps.includes(a.appName))
            .map((a: any) => {
              return {
                appName: a.appName,
                icon: a.icon,
              };
            }),
        });
      })
      .catch((error: any) => {
        alert(error);
      });
  }
  openLink = async (appName?: string) => {
    let {amount} = this.state;
    let urlPrefix = 'upi://pay';
    switch (appName) {
      case 'PhonePe':
        urlPrefix = 'phonepe://pay';
        break;
      case 'GPay':
        urlPrefix = 'tez://upi/pay';
        break;
      case 'Paytm':
        urlPrefix = 'paytmmp://pay';
        break;
      default:
        break;
    }
    let UpiUrl =
      urlPrefix +
      '?pa=gokwik@kaypay&pn=GooglePay&mc=&tr=' +
      this.makeid(17) +
      '&am=' +
      amount +
      '&cu=INR&url=https://MyUPIApp&refUrl=https://MyUPIApp';
    console.log('UpiUrl :- ', UpiUrl);
    let response = await UPI.openLink(UpiUrl);
    console.log('Response :- ', response); //however you want to handle response
  };

  makeid = (length: number) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={'Amount'}
          style={styles.TextInput}
          onChangeText={amount => this.setState({amount})}
          value={this.state.amount}
        />

        {this.state.apps.map((a: any) => {
          console.log(`<Text style={styles.item}>${a.appName}</Text>`);
          let base64Icon = 'data:image/png;base64,' + a.icon;
          return (
            <TouchableOpacity
              style={styles.paymentButton}
              onPress={() => {
                this.openLink(a.appName);
              }}
              key={a.appName}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                resizeMode="contain"
                source={{uri: base64Icon}}
              />

              <Text style={{color: 'white'}}>{a.appName}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.paymentButton} onPress={this.openLink}>
          <Text style={{color: 'white'}}>Other Upi Apps</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 150,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  TextInput: {width: '80%', height: 40, borderColor: 'gray', borderWidth: 1},
  paymentButton: {
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    flexDirection: 'row',
  },
});
function alert(error: any) {
  throw new Error('Function not implemented.');
}
