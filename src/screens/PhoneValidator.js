import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, KeyboardAvoidingView, Alert } from "react-native";
import Background from "../components/Background";
import { getStatusBarHeight } from "react-native-status-bar-height";
import PrefixPicker from "../components/PrefixPicker";
import { TextInput as Input } from "react-native-paper";
import CustomCheckBox from "../components/CustomCheckBox";
import { phoneValidator } from "../core/Utils";
import AwesomeAlert from "../components/AwesomeAlert";

let userData = {};
const PhoneValidator = ({ navigation }) => {
    const [phone, setPhone] = useState({ value: "", error: "" });
    const [finished, setFinished] = useState(false);
    if (navigation.state.params != null) {
        userData = navigation.state.params.data;
    }

    const _onNextPressed = async () => {
        setFinished(true);
    }
    const _onResendPressed = async () => {
        setFinished(false);
    }
    return (
        <Background>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.navigate("PhoneRegister")}>
                    <Image style={styles.backArrow} source={require("../../assets/arrow_back.png")} />
                </TouchableOpacity>
                <Text style={styles.title}> Código de verificación </Text>
            </View>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.middle}>
                    <Text style={styles.middleText}> Introduce el código que te hemos enviado al teléfono {userData['pref']} {userData['phone']}</Text>
                    <View style={styles.phoneline}>
                        <View style={styles.phonecontainer}>
                            <Input
                                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                                style={styles.phoneinput}
                                placeholder="Verificación"
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
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity style={styles.resend} onPress={_onResendPressed}>
                        <Text style={styles.resendButtonText}> Reenviar Mensaje </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextButton} onPress={_onNextPressed}>
                        <Text style={styles.nextButtonText}> Verificar </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            <AwesomeAlert
                show={finished}
                showProgress={false}
                title="¡Genial, eres parte de Parquick!"
                message="Ya puedes empezar a disfrutar de tu prueba gratuita de 30 días."
                lottie={require('../../assets/lottie/start.json')}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="Buscar parkings"
                confirmButtonColor="#0055ff"
                confirmButtonStyle={styles.alertbutton}
                confirmButtonTextStyle={styles.alertbuttontext}
                onConfirmPressed={() => {
                    setFinished(false);
                }} />
        </Background>
    )
}

const styles = StyleSheet.create({
    alertbuttontext: {
        fontFamily: "mont-bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: "white"
    },
    alertbutton: {
        width: 232,
        height: 48,
        paddingHorizontal: 10,
        paddingVertical: 7,
        margin: 5,
        borderRadius: 5
    },
    resend: {
        height: 48,
        width: 168,
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    resendButtonText: {
        fontFamily: "mont-bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: '#0055ff'
    },
    phoneinput: {
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
        flexDirection: "row",
        justifyContent: "space-between"

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
export default memo(PhoneValidator);