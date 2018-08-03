import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons' ;
import PropTypes from 'prop-types';
import { weatherConditions } from '../stylings/weatherConditions'

const Weather = ({weather, temperature, title, willRain}) => {
  return (
          <View style = {[styles.weatherContainer, {backgroundColor: weatherConditions[weather].color}]}>

            <View style = {styles.headerContainer} >
                          <MaterialCommunityIcons size={120} name ={weatherConditions[weather].icon} color ={'#fff'} />
                          <Text style = {styles.title}>{title}</Text>
                          <Text style={styles.tempText}>{temperature}˚</Text>
                        </View>
                        <View style = {styles.bodyContainer}>
                          {willRain ? <Text style={styles.title}>It's going to Rain Today!</Text>:<Text style={styles.title}>No Rain Today!</Text>}
                          <Text style={styles.subtitle}>{weatherConditions[weather].subtitle}</Text>
                        </View>
          </View>
  )
}

Weather.propTypes = {
  temperature: PropTypes.number.isRequired,
  weather: PropTypes.string
}

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    marginTop: 125
  },
  tempText: {
    fontSize: 48,
    color:'#fff'
  },
  bodyContainer: {
    flex:2,
    alignItems:'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    marginBottom: 40
  },
  title: {
    fontSize: 48,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});

export default Weather;
