import React, { memo, useState } from "react";
import {TouchableOpacity, StyleSheet, Text, View, Image} from "react-native";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { emailValidator, passwordValidator, nameValidator } from "../core/Utils";
import { loginUser } from "../api/auth-api";
import Toast from "../components/Toast";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Hr from "../components/Hr.js"
import { Button} from "react-native-elements"
import {Theme} from "../core/Theme";
const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const _onNextPressed = async () => {
        if (loading) return;

        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
        }else{
            let userData = {
              e: email,
              p: password
            };
            navigation.navigate("VehicleTypeRegister", {data: userData})
        }
    };

    return (
        <Background>
            <View style={styles.top}>
                <TouchableOpacity onPress={() => navigation.navigate("LoginOrRegister")} style={styles.container}>
                    <Image style={styles.backArrow} source={require("../../assets/arrow_back.png")} />
                </TouchableOpacity>
            <Text style={styles.title}> Acceder a tu cuenta</Text>
            </View>
            <View style={styles.middle}>
            <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 }>
                <Image style={styles.fblogo} source={require('../../assets/facebook.png')}/>
                <Text style={styles.TextStyle}> Acceder con Facebook </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 }>
                <Image style={styles.fblogo} source={require('../../assets/google.png')}/>
                <Text style={styles.TextStyle}> Acceder con Google </Text>
            </TouchableOpacity>
            </View>
            <Hr text="o"/>


            <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Contraseña"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                autoCapitalize="none"
            />
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.botonAzul}
                                  onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.textoBlanco}> Acceder </Text>
                </TouchableOpacity>
            </View>


            <Toast message={error} onDismiss={() => setError("")} />
        </Background>
    );
};

const styles = StyleSheet.create({
    forgot: {
        marginRight: "-20%"
    },
    top: {
        position: "absolute",
        top: 10 + getStatusBarHeight(),
        flex: 1,
        left: 0,
        flexDirection: "row",
        justifyContent: "flex-start",
        width: "100%",
    },
    middle: {
        height: "20%",
        justifyContent: "center",
        marginBottom: 20,
        marginLeft: "10%"
    },
    backArrow: {
        width: 24,
        height: 24
    },
    botonAzul: {
        marginTop: 80,
        height: 48,
        width: "90%",
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: Theme.colors.primary,
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
    SubmitButtonStyle: {
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        width: 328,
        height: 48,
        marginRight:30,
        backgroundColor: "white",
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#0055ff'
    },
    bottom: {
        flex: 0.5,
        justifyContent: 'flex-end',
        width: "100%",
        marginBottom: 36
    },
    nextArrow: {
        width: 24,
        height: 24
    },
    nextButton: {
        width: 168,
        height: 48,
        opacity: 0,
        borderRadius: 2,
        backgroundColor: "#0055ff",
        flexDirection : "row",
        alignSelf: "flex-end"
    },
    row: {
        flexDirection: "row",
        marginTop: 4
    },
    label: {
        color: '#0055ff'
    },
    link: {
        fontWeight: "bold",
        color: '#0055ff'
    },
    TextStyle:{
        width: 193,
        height: 24,
        fontFamily: "mont-bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: '#0055ff'

    },
    title : {
        marginLeft: 32,
        fontFamily: "mont-bold",
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.5,

    },
    fblogo: {
        width: 24,
        height: 24,
        marginRight: 16
    }

});

export default memo(LoginScreen);