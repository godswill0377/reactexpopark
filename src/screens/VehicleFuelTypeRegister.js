import React, { memo, useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import FuelLogo from '../../assets/svg/fuel_24.svg'
let userData = {};
const vehicleTypes = [
    {
        id: 1,
        name: "Diésel",
        icon: require('../../assets/car/fuel_diesel_32.png')
    },
    {
        id: 2,
        name: "Eléctrico",
        icon: require('../../assets/car/fuel_electric_32.png')
    },
    {
        id: 3,
        name: "Gasolina",
        icon: require('../../assets/car/fuel_gasoline_32.png')
    },
    {
        id: 4,
        name: "GLP/GNC",
        icon: require('../../assets/car/fuel_glp_32.png')
    },
    {
        id: 5,
        name: "Híbrido",
        icon: require('../../assets/car/fuel_hybrid_32.png')
    }
];



const VehicleFuelTypeRegister = ({ navigation }) =>{
    if (navigation.state.params != null){
        userData = navigation.state.params.data;
    }
    function Item({ item }) {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => onClickItem(item.id)}>
                <Image source={item.icon}  style={{width:32, height:32,borderRadius:30}} />
                <Text style={styles.vehname}>{item.name}</Text>
            </TouchableOpacity>
        );
    }
    function onClickItem(id) {
        userData['f'] = id;
        navigation.navigate("VehicleAmbientalTypeRegister", {data: userData})
    }
    //console.log(navigation.state.params.data);
    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("Register")} />
            <Text style={styles.title}> Tu vehículo </Text>
            <View style={styles.innerContainer}>
            <FuelLogo style={styles.logo} />

            <Text style={styles.title2}> ¿Qué combustible utiliza? </Text>
            <View style={styles.container}>
                <FlatList
                    style={styles.flatlist}
                    data={vehicleTypes}
                    renderItem={({ item }) => <Item item={item}/>}
                    keyExtractor={item => item.name}
                />
            </View>
            </View>
        </Background>
    )
};
const styles = StyleSheet.create({
    innerContainer:{
        flex: 1,
        flexDirection: "column",
        marginTop: 45
    },
    vehname: {
        width: 100,
        marginLeft: 16,
        height: 24,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        color: "grey",
        alignSelf: "center"
    },
    title : {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        left: 72,
        width: 147,
        height: 24,
        fontFamily: "mont-bold",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,

    },title2 : {
        width: 254,
        height: 24,
        marginTop: 20,
        fontFamily: "mont-bold",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,

    },
    logo: {
        width: 48,
        height: 48
    },
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:20,
        width:348
    },
    listItem:{
        marginTop:10,
        marginLeft: 30,
        marginRight: 30,
        padding:10,
        backgroundColor:"#FFF",
        width:328,
        height:56,
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        justifyContent: "flex-start",
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey"
    },
    flatlist:{
        width:328
    }

});

export default memo(VehicleFuelTypeRegister);