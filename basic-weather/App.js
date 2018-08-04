import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Dark_sky_key} from './secrets'
import Weather from './components/BasicWeather'
import {Permissions, Notifications} from 'expo'

const serverToken = 'https://localhost8080/token'

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    title: '',
    hourly:[],
    error:null
  }

  async registerForPushNotifications() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      console.log('here')
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
      console.log(finalStatus)
      if (finalStatus !== 'granted') {
        console.log('also here')
        return;
      }
      console.log('really here')
      const token = await Notifications.getExpoPushTokenAsync()
      console.log('token', token)
       return fetch(serverToken, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pushToken: token
        })
      })
    }
  }

  async componentDidMount(){
    await this.registerForPushNotifications()
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
 // start: how many hours from now to start looking,
 // hours: how many hours to check,
 // data: hourly data from darkSky
 // chance: percent chance of rain that equals true
  checkForRain(start = 0, hours = 12, data = this.state.hourly, chance = .3, current = this.state.weatherCondition){
    if(current === 'rain')
      return true
    for (let i = 0; i<hours; i++) {
      if (data[i].precipProbability >= chance && data[i].precipType === 'rain')
        return true
    }
    return false
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
            <Weather weather={weatherCondition} temperature={temperature} title = {title} willRain= {this.checkForRain()} />
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
  }
});
