import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

const UPI = NativeModules.UPI;

export default class App extends Component<any, {amount: string}> {
  constructor(props: any) {
    super(props);
    this.state = {amount: ''};
  }

  openLink = async () => {
    let {amount} = this.state;
    let UpiUrl =
      'upi://pay?pa=googlepay@axisbank&pn=GooglePay&mc=&tr=' +
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
        <TouchableOpacity style={styles.paymentButton} onPress={this.openLink}>
          <Text style={{color: 'white'}}>Make Payment</Text>
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
    backgroundColor: 'red',
  },
});
