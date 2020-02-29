import React, { memo, useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {getStatusBarHeight} from "react-native-status-bar-height";
import CarLogo from '../../assets/car/car_24.svg'
let userData = {};
const vehicleTypes = [
    {
        id: 1,
        name: "Compacto",
        size: "Largo hasta 4m",
        icon: require('../../assets/car/car_compact_32.png')
    },
    {
        id: 2,
        name: "Urbano",
        size: "Largo hasta 4,5m",
        icon: require('../../assets/car/car_urban_32.png')
    },
    {
        id: 3,
        name: "Berlina",
        size: "Largo hasta 4,8m",
        icon: require('../../assets/car/car_sedan_32.png')
    },
    {
        id: 4,
        name: "SUV",
        size: "Largo hasta 4,8m",
        icon: require('../../assets/car/car_suv_32.png')
    },
    {
        id: 5,
        name: "Monovolumen",
        size: "Largo hasta 5,15m",
        icon: require('../../assets/car/car_minivan_32.png')
    },
    {
        id: 6,
        name: "Furgoneta",
        size: "Largo hasta 6m",
        icon: require('../../assets/car/van_32.png')
    }
];



const VehicleTypeRegister = ({ navigation }) =>{
    if (navigation.state.params != null){
        userData = navigation.state.params.data;
    }
    function Item({ item }) {
        return (
            <TouchableOpacity style={styles.listItem} onPress={() => onClickItem(item.id)}>
                <Image source={item.icon}  style={{width:32, height:32,borderRadius:30}} />
                <Text style={styles.vehname}>{item.name}</Text>
                <Text style={styles.vehdesc}>{item.size}</Text>
            </TouchableOpacity>
        );
    }
    function onClickItem(id) {
        userData['v'] = id;
        navigation.navigate("VehicleFuelRegister", {data: userData})
    }
    //console.log(navigation.state.params.data);
    return (
        <Background>
            <BackButton goBack={() => navigation.navigate("Register")} />
            <Text style={styles.title}> Tu vehículo </Text>
            <View style={styles.innerContainer}>
            <CarLogo style={styles.carlogo} />

            <Text style={styles.title2}> ¿Qué vehículo vas a aparcar? </Text>
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
    vehdesc:{
        width: 120,
        height: 16,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        alignSelf: "center",
        letterSpacing: 0.3,
        textAlign: "right",
        color: "grey"
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
    carlogo: {
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
        justifyContent: "space-between",
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey"
    },
    flatlist:{
        width:328
    }

});

export default memo(VehicleTypeRegister);