import React from 'react';
import { StyleSheet, Text, View, DeviceEventEmitter, AppRegistry } from 'react-native';
//import BatteryManager from 'BatteryManager';
import {BatteryManager} from 'react-native-battery';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Hello Daryl</Text>
      <Text>Hello Daryl 123</Text>
      <RCTBattery></RCTBattery>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

var RCTBattery = React.createClass({
 
  getInitialState: function() {
    return {batteryLevel: null, charging:false};
  },
 
  onBatteryStatus: function(info){
    this.setState({batteryLevel: info.level});
    this.setState({charging: info.isPlugged});
  },
 
  componentDidMount: function(){
    BatteryManager.updateBatteryLevel(function(info){
      this._subscription = DeviceEventEmitter.addListener('BatteryStatus', this.onBatteryStatus);
      this.setState({batteryLevel: info.level});
      this.setState({charging: info.isPlugged});
    }.bind(this));
  },
 
  componentWillUnmount: function(){
    this._subscription.remove();
  },
 
  render: function() {
    var chargingText;
    if(this.state.charging){
      chargingText =<Text style={styles.instructions}>Charging </Text>;
    } else {
      chargingText =<Text style={styles.instructions}>Not Charging </Text>;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Battery Level {this.state.batteryLevel}
        </Text>
        {chargingText}
      </View>
    );
  }
});
 
AppRegistry.registerComponent('RCTBattery', () => RCTBattery);
 
