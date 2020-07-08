import { StyleSheet } from 'react-native'


export default StyleSheet.create({
    map: {
        flex: 1,
    },
    avatar:{
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },
    callout: {
        width: 260,
        padding: 10,
        height: '100%'
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#777',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5,
        fontWeight: '600'
    }
});