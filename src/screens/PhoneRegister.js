import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, KeyboardAvoidingView, Alert } from "react-native";
import Background from "../components/Background";
import { getStatusBarHeight } from "react-native-status-bar-height";
import PrefixPicker from "../components/PrefixPicker";
import { TextInput as Input } from "react-native-paper";
import CustomCheckBox from "../components/CustomCheckBox";
import { phoneValidator } from "../core/Utils";
import AwesomeAlert from "../components/AwesomeAlert";
let state = {
    language: "",
    checked: false,
    selectedItems: '',
}
handlePicker = (val) => {
    state.language = val;
    console.log('lang ->' + state.language);
}


let userData = {};
const PhoneRegister = ({ navigation }) => {
    const [showConditionsAlert, setShowConditionsAlert] = useState(false);
    const [conditionsAccepted, setConditionsAccepted] = useState(false);
    const [promoAccepted, setPromoAccepted] = useState(false);
    const [phone, setPhone] = useState({ value: "", error: "" });

    if (navigation.state.params != null) {
        userData = navigation.state.params.data;
    }

    const _onNextPressed = async () => {
        console.log('Conditions accepted: ' + conditionsAccepted);

        if (conditionsAccepted) {
            const isPhoneOkay = phoneValidator(phone.value);
            if (isPhoneOkay) {
                setPhone({ ...phone, error: isPhoneOkay })
                console.log("isPhoneOkay ->" + isPhoneOkay);
            } else {
                userData['pref'] = state.language;
                userData['phone'] = phone.value;
                navigation.navigate("PhoneValidator", {data: userData})
                console.log(userData);
            }

        } else {
            setShowConditionsAlert(true);
        }
    }

    return (
        <Background>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.navigate("VehicleAmbientalTypeRegister")}>
                    <Image style={styles.backArrow} source={require("../../assets/arrow_back.png")} />
                </TouchableOpacity>
                <Text style={styles.title}> Teléfono </Text>
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.middle}>
                    <Text style={styles.middleText}> Introduce tu teléfono para verificar tu identidad.
                No te enviamos publicidad, prometido ;)</Text>
                    <View style={styles.phoneline}>
                        <PrefixPicker handlePicker={handlePicker} />
                        <View style={styles.phonecontainer}>
                            <Input
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                style={styles.phoneinput}
                                placeholder="Teléfono móvil"
                                onChangeText={text => setPhone({ value: text, error: "" })}
                                textContentType="telephoneNumber"
                                selectionColor="#0055ff"
                                underlineColor="transparent"
                                mode="outlined"
                                textAlign={'center'}
                            />
                            {phone.error ? <Text style={styles.phoneerror}>{phone.error}</Text> : null}
                        </View>
                    </View>
                    <View style={styles.checkBoxes}>
                        <CustomCheckBox size={30}
                            keyValue={2}
                            onCheck={setConditionsAccepted}
                            color="#0055ff"
                            custom={createTextWithLink()}
                            value="conditions" />

                        <CustomCheckBox size={30}
                            keyValue={1}
                            onCheck={setPromoAccepted}
                            color="#0055ff"
                            labelColor="#090e1e"
                            label="Me gustaría recibir promociones de Parquick."
                            value="promo" />

                    </View>
                    <View>
                        <Text style={styles.info}>Recibirás un mensaje SMS con el código de verificación. Podrían aplicarse tarifas de mensajes y de datos.</Text>
                    </View>

                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.nextButton} onPress={_onNextPressed}>
                        <Text style={styles.nextButtonText}> Siguiente </Text>
                        <Image style={styles.nextArrow} source={require('../../assets/next_24.png')} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <AwesomeAlert
                show={showConditionsAlert}
                showProgress={false}
                title="Condiciones Parquick"
                message="Debes aceptar las condiciones de Parquick"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Ahora mismo"
                confirmButtonColor="#0055ff"
                onConfirmPressed={() => {
                    setShowConditionsAlert(false);
                }} />
        </Background>
    )
}
function someAction() {
    console.log("test");
}
let createTextWithLink = () => {
    return (<Text style={styles.term_service}>Acepto las <Text onPress={() => someAction()} style={styles.term_service_inner}>condiciones de Parquick</Text></Text>)

}
const styles = StyleSheet.create({
    phoneinput:{
        width: "100%",
        height: 48,
        
    },
    phoneerror: {
        fontSize: 12,
        color: "red",
        paddingHorizontal: 4,
        paddingTop: 4
    },
    phonecontainer: {
        width: "70%",
    },
    container: {
        alignSelf: "flex-start",
        marginTop: "20%",
        flex: 1,
        justifyContent: "space-between",
    },
    nextArrow: {
        width: 24,
        height: 24,
        alignSelf: "center"
    },
    nextButtonText: {
        alignSelf: "center",
        fontFamily: "mont-bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: "white"
    },
    bottom: {
        alignSelf: "flex-end",
        justifyContent: "center"

    },
    nextButton: {
        width: 168,
        height: 48,
        borderRadius: 2,
        backgroundColor: "#0055ff",
        flexDirection: "row",
        justifyContent: "center"
    },
    info: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        color: "#899fdc"
    },
    term_service: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        paddingLeft: 10
    },
    term_service_inner: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
        color: "#0055ff"

    },
    checkBoxes: {
        marginTop: "10%"
    },
    phoneline: {
        marginTop: "10%",
        flexDirection: "row"
    },
    TextInput: {
        padding: 0,
        margin: 0,
        fontSize: 20,
        width: 232,
        height: 48,
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#c1d9ff"
    },
    top: {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        height: 24,
        flex: 1,
        left: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    backArrow: {
        width: 24,
        height: 24
    },
    title: {
        marginLeft: 32,
        fontFamily: "mont-bold",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,

    },
    middle: {
        alignSelf: "flex-end",

    },
    middleText: {
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
    }
});
export default memo(PhoneRegister);