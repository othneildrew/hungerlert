
import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Alert,
    TouchableHighlight,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Feather as FeatherIcon } from '@expo/vector-icons';
import { getCurrentPositionAsync } from 'expo-location';
import logoIcon from '../assets/logo.png';


export default function HomeScreen({ navigation }) {

    const sendHungerAlert = () => {
        return true
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topIconContainer}>
                <Text style={styles.logoText}>Hungerlert</Text>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.topIcon}>
                        <FeatherIcon name='settings' size={32} color='#000000' />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topIcon}>
                        <FeatherIcon name='users' size={32} color='#000000' />
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Image source={logoIcon} style={styles.logoIcon} />
                <Text></Text>
                <Text></Text>
            </View>

            {/* <TouchableOpacity style={styles.alertButton} onPress={sendHungerAlert}>
                <Text style={styles.alertButtonText}>Send Alert</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.outlineButton} onPress={sendHungerAlert}>
                <Text style={styles.outlineButtonText}>Log In or Signup</Text>
            </TouchableOpacity>


            <StatusBar style='auto' />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    topIconContainer: {
        alignSelf: 'flex-end',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
    },
    topIcon: {
        paddingLeft: 20,
    },
    logoText: {
        fontSize: 24,
        fontWeight: '700',
    },
    logoIcon: {
        width: 250,
        height: 250,
    },
    instructions: {
        marginTop: 18,
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',
    },
    alertButton: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
        width: '88%',
        height: 64,
        borderRadius: 100,
        backgroundColor: '#e76618',
    },
    alertButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600'
    },
    outlineButton: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 25,
        width: '88%',
        height: 64,
        borderWidth: 4,
        borderStyle: 'solid',
        borderColor: '#000000',
        borderRadius: 100,
    },
    outlineButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '700'
    }
});

