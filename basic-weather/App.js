import React from 'react';
import { StyleSheet, Text, View, Animated, Linking } from 'react-native';
import {Dark_sky_key} from './secrets'
import Weather from './components/BasicWeather'

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    title: '',
    hourly:[],
    error:null
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
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

  async fetchWeather(lat, lon) {
    fetch(
          `https://api.darksky.net/forecast/${Dark_sky_key}/${lat},${lon}?exclude=minutely,daily,alerts,flags`) .then (res => res.json()). then(json => {
            this.setState({
              temperature: json.currently.apparentTemperature,
              weatherCondition: json.currently.icon,
              hourly:json.hourly.data,
              title:json.currently.summary,
              isLoading: false
            })
          })
  }
render() {
    const { isLoading, weatherCondition, temperature, title } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? <Text style={styles.loading}> Data is Loading </Text> : (
            <Weather weather='rain' temperature={temperature} title = {title} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  },
  loading: {
    flex:1,
    justifyContent:'center'
  }
});
