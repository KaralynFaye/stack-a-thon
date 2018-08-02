import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import {API_KEY} from './secrets'
import Weather from './components/BasicWeather'

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error:null
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPostion(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude)
      },
      error => {
        console.log(error)
        this.setState({
          error: 'Error Getting Weather Conditions'
        })
      })
  }

  fetchWeather(lat = 25, lon=25) {
    fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`) .then (res => res.json()). then(json => {
            console.log(json)
          })
  }
render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text> Data is Loading </Text> : (
            <Weather />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
  },
});
