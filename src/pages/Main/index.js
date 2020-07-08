import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import styles from './styles';
import api from '../../services/api';

export default function Main({ navigation }){
    const [ devs, setDevs ] = useState([]);
    const [ currentRegion, SetcurrentRegion ] = useState(null);
    const [ techs, setTechs ] = useState('');

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
    }, []);

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
        
            }
        });

        console.log(response.data);

        setDevs(response.data.devs);
    }

    function handleRegionChanged( region ) {
    
        SetcurrentRegion(region);
    }   

    if (!currentRegion){
        return null;
    }

    return (   
       <>
        <MapView
            onRegionChangeComplete={handleRegionChanged} 
            initialRegion={currentRegion} 
            style={styles.map}
        >
            {devs.map( dev => (
                <Marker
                    key={dev._id} 
                    coordinate={{ 
                        latitude: dev.location.coordinates[1], 
                        longitude: dev.location.coordinates[0]
                    }} 
                >
                <Image style={styles.avatar} source={{ uri: dev.avatar_url}} />
                <Callout onPress={() => {
                    navigation.navigate('Profile', {github_username: dev.github_username})
                }}> 
                    <View style={styles.callout}>
                        <Text style={styles.devName}>{dev.name}</Text>
                        <Text style={styles.devBio}>{dev.bio}</Text>
                        <Text style={styles.devTeachs}>{dev.techs.join(', ')}</Text>
                    </View>
                </Callout>
            </Marker>
            )
            )}
        </MapView>
        <View style={styles.searchForm} >
            <TextInput 
                style={styles.searchInput}
                placeholder="Buscar devs por techs..."
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={techs}
                onChangeText={setTechs}
            />
            
            <TouchableOpacity onPress={loadDevs} style={ styles.loadBotton }>
                 <MaterialIcons name="my-location" size={20} color="#fff" />
            </TouchableOpacity>

        </View>
       </>
    )
}