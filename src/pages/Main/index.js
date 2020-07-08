import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Image, View, Text } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'

import styles from './styles';

export default function Main({ navigation }){

    const [ currentRegion, SetcurrentRegion ] = useState(null);

    useEffect(() => {
        async function loadInitialPosition(){
            const { granted } = await requestPermissionsAsync();

            if (granted){
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const {latitude, longitude } = coords;
                
                SetcurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,

                });
            }
        }

        loadInitialPosition();
    }, [])

    if (!currentRegion){
        return null;
    }

    return (   
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -5.870280, longitude: -35.187834}} >
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/6172978?s=460&u=429ed7767e15d8e5202b1ea7f92b585cd5e2294f&v=4'}} />
                <Callout onPress={() => {
                    navigation.navigate('Profile', {github_username: 'thiagodemas'})
                }}> 
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Thiago Demas</Text>
                        <Text style={styles.devBio}>Full-stack developer and I love new experiences and hard challenges</Text>
                        <Text style={styles.devTeachs}>ReactJs, React Native, Node.js</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}