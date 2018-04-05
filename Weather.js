import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call';

const weatherCases = {
    Rain: {
        colors: ['#00C6FB', '#005BEA'],
        title: '雨天🌧',
        subtitle: [
            '每次到了下雨天，就感覺特別的安靜。當然我不會說，下雨天音樂和巧克力更配，而我覺得下雨天爵士樂與床和咖啡更配。聽着窗外的雨聲淅淅瀝瀝，就很放鬆，或許是許久沒有享受如此悠閒。平日的我們太匆忙了。',
            '你也知道下雨天的時候，總是讓人感傷。聽著爵士樂，泡一杯熱咖啡，聽著窗外的雨聲。',
            '當我站在教學樓下躲雨，覺得非常難過。我總覺得，站在這裡的，應該是兩個人。',
            '不管晴天雨天，都希望你能好好的照顧自己，學會給自己放鬆，別匆忙。',
            '現在是下午18:30分，雨下了一天，我坐在工作室靠窗的位置，吃了三顆綜合樓水果店買的橘子，用心的想今天的內容想了7500秒，可是還是沒有想出什麼。你知不知道雨一直下，也許再過五分之一秒，我，還是想不出。',
        ],
        icon: 'ios-rainy',
    },
    Clear: {
        colors: ['#FEF253', '#FF7300'],
        title: 'Your favorite ☀️ ',
        subtitle: [
            '不知道什麼時候開始，我變成一個很小心的人，每次我穿雨衣的時候，我都會戴太陽眼鏡，你永遠都不會知道什麼時候會下雨，什麼時候出太陽。',
            '我的夢好像都是黑白的，像老式的默劇。然而那天，我夢見一大片麥田，陽光下那麼耀眼。恍惚間還聞見陽光炙烤麥子的香氣。',
            '其實我那天去過那裡，我知道八點鐘很多人，我七點十五分就到了，那天外面下很大雨，那天雨很大，我望着玻璃窗，我看見落雨的加州，我突然好想知道另一個加州是否有好陽光，所以給了自己一年的時間。今天和那天一樣那麼大雨，望着玻璃窗，我只是想念一個人。',
            '人世間所有的相遇，都是久别重逢。寧可一思進，莫在一思停。',
            '做羹要講究火候，火候不到，難以下咽，火候過了，事情就焦。',
        ],
        icon: 'ios-sunny',
    },
    Thunderstorm: {
        colors: ['#00ECBC', '#007ADF'],
        title: '雷電交加⚡️',
        subtitle: [
            '十六號，四月十六號。一九六零年四月十六號下午三點之前的一分 鐘你和我在一起，因為你我會記住這一分鐘。從現在開始我們就是一分鐘的朋友 ，這是事實，你改變不了，因為已經過去了。我明天會再來。',
            '在從前，當一個人心裡有個不可告人的秘密，他會跑到深山裡，找一棵樹，在樹上挖個洞，將秘密告訴那個洞，再用泥土封起來，這個秘密就永遠沒人知道。',
            '念念不忘，必有回響。點一盞燈，有燈必有人。',
            '有時候，耳朵比眼睛還重要，很多東西用耳朵聽比用眼睛看好，一個人假裝開心，但聲音就裝不了。細心一聽就知道了。',
        ],
        icon: 'ios-thunderstorm',
    },
    Clouds: {
        colors: ['#D7D2CC','#304352'],
        title: '陰天☁️',
        subtitle: [
            '不知道從什麼時候開始，在每個東西上面都有個日期，秋刀魚會過期，肉罐頭會過期，連保鮮紙都會過期，我開始懷疑這個世界還有什麼是不會過期的。',
            '廚房裡有煮好的飯，另外我還買了幾個杯子，我知道，用不了多久就都會被打破，所以我偷偷藏起了一個，到有一天你需要那個杯子的時候，就打一個電話給我，我會告訴你放在什麼地方。',
            '如果，我多一張船票，你會不會跟我一起走？',
            '愛情這東西，時間很關鍵。認識得太早或太晚，都不行。',
            '從她身上我明白一個道理，只要你自己不放棄，你永遠都有機會。',
            '或去或留，我選擇了留在我的年月，那是我最開心的日子。',
        ],
        icon: 'ios-cloudy',
    },
};

async function phoneCall() {
    const args = {
        number: '63265050',
        prompt: true,
    };

    try {
        await call(args);
    } catch (error) {
        console.log(error)
    }
};

function Weather({ temp, name, uvi, title, subtitle }){
    const weatherCase = weatherCases[name];
    return (
            <LinearGradient
                colors={weatherCase.colors}
                style={styles.container}
            >
                <View style={styles.upper}>
                    <Ionicons color='white' size={130} name={weatherCase.icon} />
                </View>
                <View style={styles.middle}>
                    <Text style={styles.temp}>{temp}º</Text>
                    <Text style={styles.temp}>UV{uvi}</Text>
                </View>
                <View style={styles.lower}>
                    <Text style={styles.title}>{weatherCase.title}</Text>
                    <Text style={styles.subtitle}>{weatherCase.subtitle[(Math.floor(Math.random() * weatherCase.subtitle.length))]}</Text>
                    <TouchableOpacity onPressOut={phoneCall}>
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

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    uvi: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

export default Weather;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        paddingTop: 60,
    },
    middle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 80,
        paddingRight: 80,
        marginBottom: 100,
    },
    temp: {
        fontSize: 40,
        backgroundColor: 'transparent',
        color: 'white',
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
