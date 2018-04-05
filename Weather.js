import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import call from 'react-native-phone-call';

export default class Weather extends Component {
    render(){
        return (
            <LinearGradient
                colors={['#00C6FB', '#005BEA']}
                style={styles.container}
            >
                <View style={styles.upper}>
                    <Ionicons color='white' size={90} name='ios-rainy' />
                    <Text style={styles.temp}>35º</Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>下雨天</Text>
                    <Text style={styles.subtitle}>每次到了下雨天，就感覺特別的安靜。當然我不會說，下雨天音樂和巧克力更配，而我覺得下雨天爵士樂與床和咖啡更配。聽着窗外的雨聲淅淅瀝瀝，就很放鬆，或許是許久沒有享受如此悠閒。平日的我們太匆忙了。</Text>
                    <TouchableOpacity onPressOut={this._phoneCall}>
                        <View style={styles.call}>
                            <Text style={styles.callText}>Need a </Text>
                            <Text style={styles.car}>
                                <Ionicons color='white' size={20} name='md-car' />
                            </Text>
                            <Text style={styles.callText}> ?</Text>

                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        );
    }

    _phoneCall = async () => {
        const args = {
            number: '63265050',
            prompt: true,
        };

        try {
            await call(args);
        } catch (error) {
            console.log(error)
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    temp: {
        fontSize: 32,
        backgroundColor: 'transparent',
        color: 'white',
        marginTop: 10,
    },
    lower: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        paddingRight: 25,
    },
    title: {
        fontSize: 38,
        backgroundColor: 'transparent',
        color: 'white',
        marginBottom: 15,
        fontWeight: '500',
    },
    subtitle: {
        fontSize: 18,
        backgroundColor: 'transparent',
        color: 'white',
        marginBottom: 10,
    },
    call: {
        marginBottom: 90,
        flexDirection: 'row',
    },
    callText: {
        fontSize: 18,
        backgroundColor: 'transparent',
        color: 'white',
    },
    car: {
        fontSize: 18,
        backgroundColor: 'transparent',
        color: 'white',
    },
})
