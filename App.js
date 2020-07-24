
import React, {
    useState,
    useEffect,
} from 'react';
import logo from './assets/logo.png';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

export default function App() {

    const [ location, setLocation ] = useState(null);
    const [errorMsg, setErrorMsg ] = useState(null);

    // let mylocation = 'Waiting...';

    

    const sendHungerAlert = async () => {
        let coordinates = {};
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        if (errorMsg) {
            coordinates = errorMsg;
        }
            else if (location) {
                let jsonLocation = JSON.stringify(location);
                console.log(jsonLocation.coords)
                // coordinates.lat = jsonLocation.coords.latitude;
                // coordinates.long = jsonLocation.coords.longitude;
                alert(coordinates);
                return coordinates;
            }
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
