import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Theme} from "../core/Theme";


const usersMap = props => {
    let userLocationMarker = null;
    if (props.userLocation) {
        userLocationMarker =
            <Marker coordinate={props.userLocation}>
                <View>
                    <Image
                        style={styles.stretch}
                        source={require('../../assets/car.png')}/>
                </View>
            </Marker>;
    }
    let parksMarkers = null;
    if (props.allParksInfo) {
        parksMarkers =
            props.parksPlaces.map(parkPlace => (
                <View key={parkPlace.id}>
                    <Marker coordinate={parkPlace}>
                        <View style={styles.parkMarker}>
                            <Text style={styles.parkPrice}>P {parkPlace.price} €/h</Text>
                        </View>
                    </Marker>
                </View>
            ));
    }
    return (
        <View style={styles.mapContainer}>
            <MapView
                initialRegion={{
                    latitude: 41.3792,
                    longitude: 2.175857,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0321
                }}
                region={props.userLocation}
                style={styles.map}
                showsUserLocation
            >
                {userLocationMarker}
                {parksMarkers}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 18,
        flexDirection: 'row',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    stretch: {
        width: 14,
        height: 25,
        resizeMode: 'stretch'
    }, stretchParks: {
        flex: 1,
        width: 18,
        height: 20,
        resizeMode: 'stretch',
        flexDirection: 'row',
    }, parkPrice: {
        color: Theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.primary,
    }, parkMarker: {
        backgroundColor: Theme.colors.primary,
    }
});

export default usersMap;