import React from 'react';
import { Modal, View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Dimensions, Image, TextInput, Button, Keyboard, FlatList, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import UserMapInterface from '../components/UserMapInterface';
import * as theme from "../core/Theme";
import BottomDrawer from '../components/BottomDrawer';
import LocationLogo from '../../assets/svg/currentlocation_android_24_2.svg'
import SearchLogo from '../../assets/svg/search_24.svg'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import LottieView from 'lottie-react-native';
import MapViewDirections from '../components/MapViewDirections';
import { Input } from 'react-native-elements';
import { throttle } from "throttle-debounce";
import SearchLocationLogo from '../../assets/svg/location_24.svg'
import DestinoLogo from '../../assets/svg/placed.svg'
import TimeLogo from '../../assets/svg/time_24.svg'
import PollutionCO2Logo from '../../assets/svg/pollution_co_2_24.svg'
import PollutionNO2Logo from '../../assets/svg/pollution_no_2_24.svg'
import SavingsLogo from '../../assets/svg/saving_24.svg'
import InfoLogo from '../../assets/svg/info_24.svg'
import CarLogo from '../../assets/svg/car_24.svg'
import WalkingLogo from '../../assets/svg/walk_16.svg'
import * as qs from 'querystringify'
import AwesomeAlert from '../components/AwesomeAlert';
const { height } = Dimensions.get('screen');
let modalContent = null;
const parquickServer = 'https://control.parquick.com:1787'

export default class MapWithInterface extends React.Component {
    _mapView = React.createRef();
    _DrawerRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            userLocation: null,
            parksPlaces: null,
            allParksInfo: null,
            selectedParking: null,
            modalVisible: false,
            mapRegion: null,
            currentRegion: null,
            hasLocationPermissions: false,
            locationResult: null,
            isSearching: false,
            destinationCoords: null,
            isOnDirectionMode: false,
            originLocation: null,
            currentCity: null,
            steps: {},
            isDrawerStatic: false,
            parquickAvailable: true,
            userInputDirection: "",
            isDrawerPopped: false,
            instantSearchResults: null,
            destinationSelected: false,
            destinationInfo: "",
            showParquickSavings: false,
            showParquickSaveAlert: false,
            showParquickMarkers: false,
            drawerState: "main",
            tripSavings: {
                parquickFare: 0,
                moneySavings: 0
            },
            showSavingAlert: false,
            isochronesGot: false,
            isOnMidMap: false,
            MapViewDirectionscache: {},
            currentDirections: {},
            currentParkingListSelection: 1,
            draweroffset: 200
        }
        this.searchThrottled = throttle(1000, this.searchUserInput);
    }

    static navigationOptions = {
        title: 'Cuenta',
        drawerIcon: ({ }) => (
            <Image
                source={require('../../assets/parkedLogo.png')}
                style={styles.icon}
            />
        ),
    };

    async fetchCurrentCity() {
        let url = parquickServer
            + '/whichcity?Lat='
            + this.state.userLocation.latitude
            + '&&Long='
            + this.state.userLocation.longitude;

        const response = await fetch(url);
        const json = await response.json();
        if (json.city) {

            return Promise.resolve({
                city: json.city
            });
        }
        else {
            return Promise.reject();
        }


    }

    async getGeocodeDestination(coordinate) {
        let url = parquickServer
            + '/geocode?Lat='
            + coordinate.latitude
            + '&&Long='
            + coordinate.longitude;

        const response = await fetch(url);
        const json = await response.json();
        console.log(json)
        if (json.label) {

            return Promise.resolve({
                label: json.label,
                locality: json.locality
            });
        }
        else {
            return Promise.reject();
        }


    }

    moveMapToUser() {
        moveMapTo(this.state.userLocation);

    }
    moveMapTo(coordinate) {
        if (this._mapView.current) {
            this._mapView.current.animateToRegion(coordinate, 2000);
        }
    }

    _handleMapLongPress(e) {
        console.log(e.nativeEvent.coordinate);
        this.setState({
            destinationCoords: e.nativeEvent.coordinate,
            originLocation: this.state.userLocation,
            isOnDirectionMode: false,
            drawerState: "find"
        });
        this.moveMapTo(e.nativeEvent.coordinate);
        this.getGeocodeDestination(e.nativeEvent.coordinate).then((res) => {
            this.setState({
                destinationInfo: {
                    label: res.label,
                    locality: res.locality
                }
            })
        });
    }

    renderDestination() {
        return this.state.destinationCoords ?
            <Marker coordinate={this.state.destinationCoords}>
                <DestinoLogo style={styles.destinologo} />
            </Marker>
            : null;

    }
    renderDestinationDirectionsByCar() {
        return this.state.isOnDirectionMode ?
            <MapViewDirections
                coordinates={this.state.currentDirections[this.state.currentParkingListSelection]['car'].coordinates}
            />
            : null

    }
    renderDestinationDirectionsWalking() {
        return this.state.isOnDirectionMode ?
            <MapViewDirections
                coordinates={this.state.currentDirections[this.state.currentParkingListSelection]['walking'].coordinates}
                lineColor={'green'}
            />
            : null

    }
    _setStepsByCar = steps => {
        this.setState({ steps: steps })
        console.log("STEPS:");
        console.log(steps);
    }

    searchOnMyCurrentLocation() {
        this.setState({ isSearching: true })
        this.fetchCurrentCity()
            .then(result => {
                this.setState({ currentCity: result.city });
                this.setState({ drawerState: "find" })
                this.getParksHandler(result.city)
                    .then(isParquickHere => {
                        if (isParquickHere) {
                            this.setState({ drawerState: "prepayment" })
                        } else {
                            this.setState({ drawerState: "notavailable" })
                        }

                    })
            })
            .catch(errorMessage => {
                console.warn(`Searching city Error: ${errorMessage}`); // eslint-disable-line no-console
            })
    }

    resetSearch() {
        this.setState({
            parquickAvailable: true,
            isSearching: false,
            isDrawerPopped: false,
            userInputDirection: "",
            instantSearchResults: null,
            parksPlaces: null,
            allParksInfo: null,
            destinationCoords: null
        })
        this.setState({
            drawerState: "main"
        })
    }
    renderParquickNotAvailableDrawer() {
        return (
            <View style={styles.drawerContainer}>

                <Text style={styles.drawerTitle}>Parquick aún no está disponible aquí</Text>
                <Text style={styles.drawerPresentation}>Solo disponible para Barcelona</Text>
                <TouchableOpacity style={styles.botonAzul} activeOpacity={.5} onPress={() => this.resetSearch()}>
                    <Text style={styles.textoBlanco}> Modificar destino </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderFindDrawer() {
        return (
            <View>
                <Text style={styles.drawerTitle}>Fija un punto en el mapa</Text>
                <View style={styles.destinationS}>
                    <SearchLocationLogo style={styles.searchListItemIcon} />
                    <View>
                        <Text style={styles.searchListItemLabel}>Ubicación</Text>
                        <Text style={styles.searchListItemName}>{this.state.destinationInfo.label}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.botonAzul} activeOpacity={.5} onPress={() => this._handleDestinationSelected()}>
                    <Text style={styles.textoBlanco}> Seleccionar destino </Text>
                </TouchableOpacity>
            </View>
        )
    }

    _handleDestinationSelected() {
        this.getParksHandler(this.state.destinationInfo.locality)
            .then((res) => {
                if (this.state.parksPlaces) {
                    this.setState({ drawerState: "prepayment" })
                    this.getSavingsForThisTrip();

                } else {
                    this.setState({ drawerState: "notavailable" })
                }

            })

    }

    getSavingsForThisTrip() {

        //TODO, esto es solo un mockup de datos:
        const response = {
            parquickFare: 0.26,
            isOnTrial: true,
            timeSave: 15,
            co2Savings: 46,
            no2Savings: 24,
            moneySavings: 0.33
        }

        if (response.parquickFare < response.moneySavings && !response.isOnTrial) {
            console.log("ahorrando")
            this.setState({ showParquickSaveAlert: true })
        }
        this.setState({
            tripSavings: response,
            isOnMidMap: true,
            showParquickSavings: true
        })
    }

    _handlePayment() {
        //TODO payment integration
        let isOkay = true;
        if (isOkay) {
            this._handleShowParkingList()
        }
    }
    _handleShowParkingList() {
        this.setState({ drawerState: "parkinglist" })

    }

    renderParkingPrePayment() {
        if (!this.state.isochronesGot) {
            console.log("get isochrones")
            for (let park in this.state.allParksInfo) {
                this.fetchAndRenderRoute(this.state.userLocation, this.state.allParksInfo[park], false, park);
                this.fetchAndRenderRoute(this.state.allParksInfo[park], this.state.destinationCoords, true, park);
            }
            this.setState({ isochronesGot: true })
        }
        return (

            <View>
                <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between", width: "90%" }}>
                    <Text style={[styles.searchListItemName, { marginLeft: "10%" }]}>Pago del Parquick</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={this.state.tripSavings.isOnTrial ? styles.parquickSavingsFreeFare : styles.parquickSavingsFare}> {this.state.tripSavings.parquickFare}€ </Text>
                        {this.state.tripSavings.isOnTrial ? <Text> Gratis </Text> : null}
                    </View>
                </View>
                <View>
                    <TouchableOpacity style={styles.botonAzul} activeOpacity={.5} onPress={() => this._handlePayment()}>
                        <Text style={styles.textoBlanco}> {this.state.tripSavings.isOnTrial ? "Mostrar parkings" : "Pagar y mostrar parkings"} </Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    searchUserInput(text) {
        this.getAutocompleteDirections(text);
    }

    renderSwitchForBottomDrawer() {
        console.log(`new Drawer State: ${this.state.drawerState} `);
        switch (this.state.drawerState) {
            case 'main':
                if (this.state.isDrawerStatic) {
                    this.setState({ isDrawerStatic: false })
                }
                return this.renderMainDrawerContent();
            case 'notavailable':
                if (!this.state.isDrawerStatic) {
                    this.setState({ isDrawerStatic: true })
                }
                return this.renderParquickNotAvailableDrawer();
            case 'find':
                if (!this.state.isDrawerStatic) {
                    this.setState({ isDrawerStatic: true })
                }
                return this.renderFindDrawer();
            case 'prepayment':
                if (!this.state.isDrawerStatic) {
                    this.setState({ isDrawerStatic: true })
                }
                return this.renderParkingPrePayment();
            case 'parkinglist':
                if (!this.state.isDrawerStatic) {
                    this.setState({ isDrawerStatic: true })
                }
                if (!this.state.showParquickMarkers) {
                    this.setState({ showParquickMarkers: true })
                }
                if (!this.state.isOnDirectionMode) {
                    this.setState({ isOnDirectionMode: true })
                }
                if (this.state.showParquickSavings) {
                    this.setState({ showParquickSavings: false })
                }
                this.midPopDrawer()
                return this.renderDrawerParkingList();
        }
    }
    renderMainDrawerContent() {
        return (
            <View style={styles.drawerContainer}>

                {this.state.isDrawerPopped ? null
                    : (<View>
                        <Text style={styles.drawerPresentation}>Buenos días Marc,</Text>
                        <Text style={styles.drawerTitle}>¿Donde aparcamos hoy?</Text>

                        <TouchableOpacity style={styles.drawerButton} activeOpacity={.5} onPress={() => this.searchOnMyCurrentLocation()}>
                            <LocationLogo style={styles.fblogo} />
                            <Text style={styles.TextStyle}> En mi ubicación </Text>
                        </TouchableOpacity>
                    </View>
                    )}
                <View style={styles.drawerTextInput} activeOpacity={.5}>
                    <Input
                        leftIcon={
                            <SearchLogo style={styles.fblogo} />
                        }
                        style={{ flex: 1, justifyContent: "space-around" }}
                        placeholder="Buscar lugar o dirección"
                        placeholderStyle={styles.placeholderStyle}
                        leftIconContainerStyle={{ marginRight: 10, marginLeft: -5 }}
                        returnKeyType="next"
                        value={this.state.userInputDirection}
                        onChangeText={text => {
                            this.setState({ userInputDirection: text })
                            this.searchThrottled(text)
                        }}
                        onFocus={() => this.popDrawer()}
                        autoCapitalize="none"
                    />
                </View>
                {this.state.instantSearchResults ? <View>{this.renderSearchResultFlatlist()}</View> : null}
            </View>
        )
    }
    navigateToSearchResult(item) {
        this._DrawerRef.current.goDownTransition();
        this.resetSearch();

        this.setState({
            destinationCoords: item.coordinates,
            drawerState: "find"
        });
        this.getGeocodeDestination(item.coordinates).then((res) => {
            console.log(res)
            this.setState({ destinationInfo: { label: res.label, locality: res.locality } })
        });
        this.moveMapTo(item.coordinates)
    }

    renderSearchResultFlatlist() {
        if (this.state.instantSearchResults) {
            let onClick = (item) => { this.navigateToSearchResult(item) };
            return (
                <KeyboardAvoidingView behavior="padding" >
                    <FlatList
                        data={this.state.instantSearchResults}
                        renderItem={({ item }) => <this.InstantSearchItem item={item} onClick={onClick} />}
                        keyExtractor={item => item.name}
                    />
                </KeyboardAvoidingView>
            )
        }
    }

    InstantSearchItem({ item, onClick }) {
        return (
            <TouchableOpacity style={styles.searchListItem} onPress={() => onClick(item)}>
                <SearchLocationLogo style={styles.searchListItemIcon} />
                <View>
                    <Text style={styles.searchListItemName}>{item.name}</Text>
                    <Text style={styles.searchListItemLabel}>{item.label}</Text>
                </View>

            </TouchableOpacity>
        );
    }

    renderDrawerParkingList() {
        if (!this.state.currentParkingListSelection) {
            this.setState({ currentParkingListSelection: 1 })
        }

        let onClick = (item) => {
            this.setState({ currentParkingListSelection: item.id })
            this.calculateDoubleNavigation(item)
        };

        return (
            <View style={{  alignItems: "center", alignSelf: "center", width: "100%" }}>
                <FlatList
                    data={this.state.allParksInfo}
                    renderItem={({ item }) => <this.parkingListItem
                        item={item}
                        onClick={onClick}
                        directions={this.state.currentDirections[item.id]}
                        currentSelection={this.state.currentParkingListSelection} />}
                    keyExtractor={item => item.id}
                    style={{ alignSelf: "center" }}
                />
                <TouchableOpacity style={styles.botonAzul} activeOpacity={.5} onPress={() => this.resetSearch()}>
                    <Text style={styles.textoBlanco}> Ir al parking elegido </Text>
                </TouchableOpacity>
            </View>
        )

    }

    parkingListItem({ item, onClick, directions, currentSelection }) {
        let spots = '';
        if (item.availableSpots > 0) {
            spots = `+ ${item.availableSpots} Libres`
        } else {
            spots = 'Completo'
        }
        let timeByCar = secondsToHms(directions.car.duration)
        let timeWalking = secondsToHms(directions.walking.duration)

        return (
            <TouchableOpacity style={[styles.parkListItem, currentSelection == item.id ? styles.parkListSelected : null]} onPress={() => onClick(item)}>
                <View>
                    <Text style={styles.parkListParkingName}>{item.parking_name}</Text>
                    <Text style={styles.parkListAvailableSpots}>{spots}</Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flexDirection: "row" }}>
                        <CarLogo style={styles.parkListIcon}/>
                        {timeByCar.h > 0 ? <Text style={styles.parkListValues}> {timeByCar.h} </Text> : null}
                        {timeByCar.h > 0 ? <Text style={styles.parkListmin}> h </Text> : null}
                        {timeByCar.m > 0 ? <Text style={styles.parkListValues}> {timeByCar.m} </Text> : null}
                        {timeByCar.m > 0 ? <Text style={styles.parkListmin}> m </Text> : null}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <WalkingLogo style={styles.parkListIcon}/>
                        {timeWalking.h > 0 ? <Text style={styles.parkListValues}> {timeWalking.h} </Text> : null}
                        {timeWalking.h > 0 ? <Text style={styles.parkListmin}> h </Text> : null}
                        {timeWalking.m > 0 ? <Text style={styles.parkListValues}> {timeWalking.m} </Text> : null}
                        {timeWalking.m > 0 ? <Text style={styles.parkListmin}> m </Text> : null}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.parquickSavingsCategories}> {item.price} </Text>
                        {timeWalking.m > 0 ? <Text style={styles.parkListmin}> €/h </Text> : null}
                        <InfoLogo style={styles.parkListIcon} />
                    </View>
                </View>

            </TouchableOpacity>
        );
    }

    calculateDoubleNavigation(item) {
        this.moveMapTo({
            latitude: item.latitude,
            longitude: item.longitude
        })
        console.log(item);
    }

    popDrawer() {
        this.setState({ isDrawerPopped: true })
        if (this._DrawerRef.current) {
            this._DrawerRef.current.transitionTo({
                "x": 0,
                "y": 40
            })
        }
    }

    midPopDrawer() {
        if (!this.state.isDrawerPopped) {
            if (this._DrawerRef.current) {
                this._DrawerRef.current.transitionToMid()
            }
            this.setState({ isDrawerPopped: true })
        }
    }
    renderBottomDrawer() {
        return (
            <BottomDrawer
                ref={this._DrawerRef}
                isStatic={this.state.isDrawerStatic}
                startUp={false}
                containerHeight={800}
                offset={this.state.draweroffset}
                onExpanded={() => { console.log('expanded') }}
                onCollapsed={() => {
                    Keyboard.dismiss();
                    this.setState({ isDrawerPopped: false });
                    if (!this.state.isDrawerStatic) {
                        this.resetSearch();
                    }
                    console.log('collapsed')
                }}
            >
                {this.renderSwitchForBottomDrawer()}
            </BottomDrawer>

        )
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    componentDidMount() {
        this._getLocationAsync();
        //this.getParksHandler();
    }



    _handleMapRegionChange(Region) {
        this.setState({ currentRegion: Region });
    };

    _getUserLocationMarker() {
        if (this.state.userLocation) {
            return <Marker.Animated ref={marker => {
                this.marker = marker;
            }}
                coordinate={this.state.userLocation}>
                <View style={styles.userMarker}>
                    {this._renderLottieType()}
                    <Image
                        style={styles.stretch}
                        source={require('../../assets/car.png')} />

                </View>
            </Marker.Animated>;
        } else {
            return null;
        }
    }

    _renderLottieType() {
        return this.state.isSearching ? <LottieView style={styles.caranimation} source={require('../../assets/lottie/radar.json')} autoPlay loop />
            : <LottieView style={styles.caranimation} source={require('../../assets/lottie/waves.json')} autoPlay loop />;
    }

    _getParkingMarkers() {
        if (this.state.showParquickMarkers) {
            return this.state.parksPlaces.map(parkPlace => (
                <View key={parkPlace.id}>
                    <Marker coordinate={parkPlace}>
                        <View style={styles.container}>
                            <View style={styles.bubble}>
                                <Text style={styles.pLetter} > P </Text>
                                <Text style={[styles.amount]}>{parkPlace.price}</Text>
                                <Text style={styles.moneypertime}>€/h</Text>
                            </View>
                            <View style={styles.arrowBorder} />
                            <View style={styles.arrow} />
                        </View>
                    </Marker>
                </View>
            ));
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        await Location.watchPositionAsync({ accuracy: Location.Accuracy.Balanced, timeInterval: 300, distanceInterval: 1 },
            loc => this.setState({
                userLocation: {
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    speed: loc.speed
                }
            }));

        // Center the map on the location we just fetched.
        //this.setState({ mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 } });
    };

    async getAutocompleteDirections(text) {

        fetch(`https://control.parquick.com:1787/autocompletedirection?text=${text}&&lat=${this.state.userLocation.latitude}&&lon=${this.state.userLocation.longitude}`)
            .then(res => res.json())
            .then(jres => {
                if (jres.features) {
                    let features = jres.features;
                    const resultArray = [];
                    for (const f in features) {
                        const properties = features[f].properties;
                        const coordinates = features[f].geometry.coordinates;
                        resultArray.push({
                            label: properties.label,
                            name: properties.name,
                            locality: properties.localadmin,
                            coordinates: {
                                latitude: coordinates[1],
                                longitude: coordinates[0]
                            }
                        })
                    }
                    this.setState({ instantSearchResults: resultArray });
                } else {
                    this.setState({ instantSearchResults: null });
                    Promise.reject();
                }
            })
            .catch(err => console.log('Error: ' + err));

    };

    async getParksHandler(city) {
        let isAvailable = null;
        await fetch(`https://control.parquick.com:1787/parkings/${city}`)
            .then(res => res.json())
            .then(parsedRes => {
                const placesArray = [];
                const infoArray = [];
                console.log('Response Control:');
                console.log(parsedRes);
                if (!parsedRes.cause) {
                    for (const key in parsedRes) {
                        if (parsedRes.hasOwnProperty(key)) {
                            placesArray.push({
                                latitude: parsedRes[key].latitude,
                                longitude: parsedRes[key].longitude,
                                id: key,
                                price: parsedRes[key].price
                            });
                            infoArray.push({
                                latitude: parsedRes[key].latitude,
                                longitude: parsedRes[key].longitude,
                                id: key,
                                address: parsedRes[key].address,
                                currentIn: parsedRes[key].currentIn,
                                maxSize: parsedRes[key].maxSize,
                                parking_name: parsedRes[key].name,
                                price: parsedRes[key].price,
                                availableSpots: parsedRes[key].maxSize - parsedRes[key].currentIn
                            });
                        }
                    }
                    isAvailable = true;
                    this.setState({
                        parksPlaces: placesArray,
                        allParksInfo: infoArray
                    });
                } else {
                    isAvailable = false;
                    return false;
                }
            })
            .catch(err => console.log('Error: ' + err));
        return isAvailable;

    };

    async getParkingTelemetry(parkingName) {
        await fetch(`https://control.parquick.com:1787/telemetry/${parkingName}`)
            .then(res => res.json())
            .then(parsedRes => {
                console.log('Telemetry Control:');
                console.log(parsedRes);
                if (parsedRes.currentIn) {
                    this.setState({ destinationTelemetry: parsedRes.currentIn })
                }
            })
            .catch(err => console.log('Error: ' + err));
    };

    getLocNParks = () => {
        this.setModalVisible(true);
    };

    renderParquickSavings() {

        return (
            <View style={styles.parquickSavingsContainer}>
                <Text style={styles.parquickSavingsParkingFound}> PARKINGS ENCONTRADOS EN TU UBICACIÓN </Text>
                <View style={styles.parquickSavingsView} onTouchStart={() => this.setState({ showParquickSaveAlert: true })}>
                    <Text style={styles.parquickSavingsTitle}> Vas a ahorrar: </Text>
                    <View style={{ flexDirection: "row" }}>
                        <SavingsLogo />
                        <Text style={styles.parquickSavingsQuantity}> +0,33€</Text>
                    </View>
                    <Text style={styles.parquickSavingsDisclaimer}> Combustible y desgastes. </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row" }}>
                            <TimeLogo />
                            <Text style={styles.parquickSavingsCategories}> 15 min</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <PollutionCO2Logo />
                            <Text style={styles.parquickSavingsCategories}> 46gCO2 </Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <PollutionNO2Logo />
                            <Text style={styles.parquickSavingsCategories}> 24gNO2</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        if (this.state.modalVisible && this.state.allParksInfo) {
            return (
                <View>
                    <View style={styles.mapContainer}>
                        <MapView
                            ref={this._mapView}
                            initialRegion={this.state.userLocation}
                            style={styles.map}
                            onRegionChange={(region) => { this._handleMapRegionChange(region) }}
                            region={this.state.mapRegion}
                            onLongPress={this._handleMapLongPress}
                        >
                            {this._getUserLocationMarker()}
                            {this._getParkingMarkers()}
                            {this.renderDestination()}
                            {this.renderDestinationDirectionsByCar()}
                            {this.renderDestinationDirectionsWalking()}
                        </MapView>
                    </View>
                    <UserMapInterface onGetLocation={this.getLocNParks}
                        onPress={() => {
                            this.props.navigation.toggleDrawer();

                        }}
                        allParksInfo={this.state.allParksInfo}
                        modalVisible={this.state.modalVisible} />
                    <Modal
                        style={styles.modalContainer}
                        animationType='slide'
                        fullScreen={false}
                        transparent={true}
                        coverScreen={false}
                    >
                        <View style={styles.modalInfo}>
                            <Text>{this.state.allParksInfo[0].address}</Text>
                            <TouchableHighlight
                                onPress={() => {
                                    // this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>{'\n'} {this.state.allParksInfo[0].latitude}</Text>
                            </TouchableHighlight>
                        </View>
                        <TouchableHighlight style={styles.initiateRouteButton}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={{ color: theme.Theme.colors.white }}>Ir al parking elegido</Text>
                        </TouchableHighlight>
                    </Modal>
                </View>
            );
        }
        return (
            <View>
                <View style={styles.mapContainer}>
                    <MapView
                        ref={this._mapView}
                        initialRegion={this.state.userLocation}
                        style={this.state.isOnMidMap ? styles.midMap : styles.map}
                        region={this.state.mapRegion}
                        onRegionChange={(region) => { this._handleMapRegionChange(region) }}
                        onLongPress={(e) => this._handleMapLongPress(e)}
                    >
                        {this._getUserLocationMarker()}
                        {this._getParkingMarkers()}
                        {this.renderDestination()}
                        {this.renderDestinationDirectionsByCar()}
                        {this.renderDestinationDirectionsWalking()}
                    </MapView>

                </View>
                <UserMapInterface onGetLocation={this.getLocNParks}
                    onPress={() => {
                        this.props.navigation.toggleDrawer();

                    }}
                    allParksInfo={this.state.allParksInfo}
                    modalVisible={this.state.modalVisible} />

                {this.state.showParquickSavings ? this.renderParquickSavings() : null}
                {this.renderBottomDrawer()}
                <AwesomeAlert
                    show={this.state.showParquickSaveAlert}
                    showProgress={false}
                    title="¡Este parquick no te cuesta nada"
                    message="Lo compensas con parte del ahorro que vas a conseguir, evitando dar vueltas buscando aparcamiento."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={true}
                    confirmText="Entendido"
                    confirmButtonColor="#0055ff"
                    onConfirmPressed={() => {
                        this.setState({ showParquickSaveAlert: false })
                    }} />
            </View>
        );

    }
    decode(t) {
        let points = [];
        let encoded = t;
        let index = 0, len = encoded.length;
        let lat = 0, lng = 0;
        while (index < len) {
            let b, shift = 0, result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);

            let dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lat += dlat;
            shift = 0;
            result = 0;
            do {
                b = encoded.charAt(index++).charCodeAt(0) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
            let dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
            lng += dlng;

            points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) });
        }

        return points;
    }

    fetchAndRenderRoute(origin, destination, mode, id) {

        const routes = [];
        routes.push({
            origin: origin,
            destination: destination,
            mode: mode
        })
        if (!this.state.MapViewDirectionscache[routes]) {
            console.log("asking for route")
            Promise.all(routes.map((route, index) => {
                let orig = route.origin;
                let dest = route.destination;
                return (
                    this.fetchRoute(parquickServer + '/directions', orig, dest, mode)
                        .then(result => {
                            return result;
                        })
                        .catch(errorMessage => {
                            console.warn(`MapViewDirections Error: ${errorMessage}`); // eslint-disable-line no-console
                        })
                );
            })).then(result => {
                let state = {
                    coordinates: result[0].coordinates,
                    distance: result[0].distance,
                    duration: result[0].duration,
                    steps: result[0].steps
                };
                this.state.MapViewDirectionscache[routes] = state;
                this.state.steps[routes] = result[0].steps;
                this.setCurrentDirection(id, mode, {
                    coordinates: state.coordinates,
                    duration: state.duration
                })

            });
        } else {
            console.log("returning cached route")
            this.setCurrentDirection(id, mode, {
                coordinates: this.state.MapViewDirectionscache[routes].coordinates,
                duration: this.state.MapViewDirectionscache[routes].duration
            })
        }

    }
    setCurrentDirection(id, isWalking, obj) {
        let mode = isWalking ? 'walking' : 'car'
        let curr = this.state.currentDirections;
        if (!curr[id]) {
            curr[id] = {};
        }
        if (!curr[id][mode]) {
            curr[id][mode] = {}
        }
        curr[id][mode] = obj;
        this.setState({ currentDirections: curr })
    }

    async fetchRoute(directionsServiceBaseUrl, origin, destination, walking) {

        let url = directionsServiceBaseUrl;
        if (typeof (directionsServiceBaseUrl) === 'string') {
            if (walking) {
                url += 'walking'
            }
            url += `?originLat=${origin.latitude}&&originLon=${origin.longitude}&&destinationLat=${destination.latitude}&&destinationLon=${destination.longitude}`;
        }

        console.log("url")
        console.log(url)

        try {
            const response = await fetch(url);
            const json = await response.json();
            if (json.routes.length) {
                const route = json.routes[0];
                return Promise.resolve({
                    distance: route.summary.distance,
                    duration: route.summary.duration,
                    coordinates: this.decode(route.geometry),
                    steps: route.segments[0].steps
                });
            }
            else {
                return Promise.reject();
            }
        }
        catch (err) {
            console.warn('react-native-maps-directions Error on route request', err); // eslint-disable-line no-console
        }
    }

}




const styles = StyleSheet.create({
    parkListItem:{
        width: 328,
        height: 56,
        opacity: 0.5
    },
    parkListAvailableSpots: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing: 0.26,
        color: "#00db5c"
    },
    parkListSelected: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#0055ff",
        opacity: 1
    },
    parkListIcon: {
        width: 16,
        height: 16
    },
    parkListmin: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 10,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 12,
        letterSpacing: 0.2,
        color: "#090e1e"
    },
    parkListValues: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: -0.3,
        color: "#000828"
    },
    parkListParkingName: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        color: "#899fdc"
    },
    parquickSavingsFare: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 18,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.1,
        textAlign: "right",
        color: "#000828"
    },
    parquickSavingsFreeFare: {
        fontFamily: "TT-Hoves-Regular",
        textDecorationLine: "line-through",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        textAlign: "right",
        color: "#899fdc"
    },
    parquickSavingsTitle: {
        fontFamily: "mont-bold",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "white"
    },
    parquickSavingsQuantity: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 34,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.1,
        color: "#cae9ff"
    },
    parquickSavingsDisclaimer: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        color: "#cae9ff"
    },
    parquickSavingsCategories: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        color: "#cae9ff"
    },
    parquickSavingsParkingFound: {
        fontFamily: "mont-bold",
        fontSize: 10,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 12,
        letterSpacing: 0.4,
        textAlign: "center",
        color: "#000828"
    },
    parquickSavingsContainer: {
        alignItems: "center",
        flexDirection: "column",
        marginTop: "85%",
        height: "50%",
    },
    parquickSavingsView: {
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: 400,
        backgroundColor: "blue"
    },
    destinationS: {
        flexDirection: "row",
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#c1d9ff"
    },
    searchListItemIcon: {
        width: 24,
        height: 24,
        justifyContent: "center",
        alignSelf: "flex-start"
    },
    destinologo: {
        width: 80,
        height: 40,

    },
    searchListItemName: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        color: "#090e1e"
    },
    searchListItemLabel: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        color: "#899fdc"
    },
    searchListItemIcon: {
        width: 24,
        height: 24,
        marginRight: 20
    },
    searchListItem: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        width: "100%",
        height: 56,
        borderRadius: 1,
        borderColor: "#19000828",
        marginTop: 10
    },
    placeholderStyle: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        color: "#090e1e"
    },
    userMarker: {
    },
    caranimation: {
        position: "absolute",
        top: -15,
        left: -15,
        width: 112
    },
    pLetter: {
        fontSize: 16,
        color: "white"
    },
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    bubble: {
        flex: 0,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#0055ff',
        padding: 2,
        borderRadius: 3,
        borderColor: '#0066ff',
        borderWidth: 0.5,
    },
    moneypertime: {
        color: '#FFFFFF',
        fontSize: 10,
    },
    amount: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'transparent',
        borderTopColor: '#0055ff',
        alignSelf: 'center',
        marginTop: -9,
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderWidth: 4,
        borderColor: 'transparent',
        borderTopColor: '#0055ff',
        alignSelf: 'center',
        marginTop: -0.5,
    },
    botonAzul: {
        height: 48,
        marginTop: 20,
        width: "90%",
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        backgroundColor: "#0055ff",
    },
    textoBlanco: {
        fontFamily: "mont-bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: 'white'
    },
    mapContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 18,
        flexDirection: 'row',
    },
    midMap: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2 + 20,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    stretch: {
        height: 40,
    },
    stretchParks: {
        flex: 1,
        width: 18,
        height: 20,
        resizeMode: 'stretch',
        flexDirection: 'row',
    },
    drawerPresentation: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        marginLeft: 24,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        color: "#090e1e"
    },
    drawerTitle: {
        fontFamily: "mont-bold",
        marginLeft: 24,
        marginBottom: 20,
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,
        color: "#090e1e"
    },
    drawerContainer: {
        flexDirection: "column",
        padding: 10
    },
    drawerTextInput: {
        marginTop: 10,
        width: 328,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 48,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#c1d9ff"
    },
    drawerButton: {
        width: 328,
        height: 48,
        marginLeft: 16,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#c1d9ff"
    },
    fblogo: {
        width: 24,
        height: 24
    },
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        height: '80%',
        marginTop: height / 2,
    },
    modal: {
        flexDirection: 'row',
        padding: theme.SIZES.base * 2,
        backgroundColor: 'transparent',
        borderTopLeftRadius: theme.SIZES.base,
        borderTopRightRadius: theme.SIZES.base,
    },
    modalInfo: {
        alignItems: 'center',
        backgroundColor: theme.Theme.colors.white,
        justifyContent: 'center',
        width: '100%',
        marginTop: height / 1.30,
        marginBottom: 0,
    },
    modalHours: {
        paddingVertical: height * 0.15,
    },
    modalHoursDropdown: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: theme.SIZES.base,
    }, icon: {
        height: 20,
        width: 20,
    }, modalViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '50%',
    },
    initiateRouteButton: {
        backgroundColor: theme.Theme.colors.primary,
        alignItems: 'center',
        height: height / 20,
        width: '100%',
    }

});


function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    return  {
        h: h,
        m: m
    };
}