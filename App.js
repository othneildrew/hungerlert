
import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import logo from './assets/logo.png';




Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});





export default function App() {
    const [ location, setLocation ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ expoPushToken, setExpoPushToken ] = useState('');
    const [ notification, setNotification ] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // let mylocation = 'Waiting...';













    const registerForPushNotificationsAsync = async () => {
        let token;

        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }

            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } 
            else {
                alert('Must use physical device for Push Notifications');
            }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }




    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);



    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);



        console.log(location)
        alert(`Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}`);
    }


    


    const sendPushNotificationAsync = () => {

    }




    

    const sendHungerAlert = () => {


        getLocation();









        // if (errorMsg) {
        //     coordinates = errorMsg;
        // }
            // else if (location) {
                // let jsonLocation = JSON.stringify(location);
                
                // console.log(jsonLocation.coords)
                // alert('lat ' + jsonLocation.coords.latitude, 'long' + jsonLocation.coords.longitude)
                // coordinates.lat = jsonLocation.coords.latitude;
                // coordinates.long = jsonLocation.coords.longitude;
                // alert(location);
                // return coordinates;
            // }
    }




    // const openImagePickerAsync = async () => {
    //     let permission = await ImagePicker.requestCameraRollPermissionsAsync();

    //     if (permission.granted === false) {
    //         alert('Permission to access camera roll is required.');
    //         return;
    //     }

    //     let picker = await ImagePicker.launchImageLibraryAsync();
    //     console.log(picker);
    // }


    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} />

            <Text>{expoPushToken}</Text>

            <Text style={styles.instructions}>Alert nearby friends that you're hungry!</Text>

            <TouchableOpacity style={styles.button} onPress={sendHungerAlert}>
                <Text style={styles.buttonText}>Send Alert</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5ba67',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 256,
        height: 256,
    },
    instructions: {
        marginTop: 18,
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        margin: 25,
        width: '88%',
        height: 55,
        borderRadius: 8,
        backgroundColor: '#e76618',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600'
    }
});
