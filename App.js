import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = '796b83219afe05abdccc5d9fe2007653'; 

export default class App extends Component {
    state = {
        tempLoaded: false,
        uvLoaded: false,
        error: null,
        temp: null,
        name: null,
        uvi: null,
        city: null,
        wind: null,
    };

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            position => {
                this._getWeather(position.coords.latitude, position.coords.longitude);
                this._getUVI(position.coords.latitude, position.coords.longitude);
            },
            error => {
                this.setState({
                    error
                });
            },
        );
    }
    
    _getWeather = (lat, lon) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}`)
        .then(response => response.json())
        .then(json => {
            console.log(json);
            this.setState({
                temp: json.main.temp,
                name: json.weather[0].main,
                city: json.name,
                wind: json.wind.speed,
                tempLoaded: true,
            })
        });
    };

    _getUVI = (lat, lon) => {
        fetch(
            `http://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`,
            {
                headers: {
                    "x-access-token": "eb19320696318cf1247db18cc2e9387f"
                },
            })
        .then(response => response.json())
        .then(json => {
            this.setState({
                uvi: json.result.uv,
                uvLoaded: true,
            })
        });
    };

    render() {
        const { tempLoaded, uvLoaded, error, temp, name, uvi, city, wind } = this.state;
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                {(tempLoaded  && uvLoaded) ? (
                    <Weather 
                        temp={Math.ceil(temp - 273.15)}
                        name={name}
                        uvi={uvi.toFixed(1)}
                        city={city}
                        wind={wind}
                    />
                ) : (
                    <View style={styles.loading}>
                        <Text style={styles.loadingText}>Getting the lovely weather</Text>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    backgroundColor: 'transparent',
    marginBottom: 40,
  },
  loading: {
    flex: 1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25,
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 90,
  },
});
