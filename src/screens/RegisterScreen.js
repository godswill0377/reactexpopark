import React, { memo, useState } from "react";
import {TouchableOpacity, StyleSheet, Text, View, Image} from "react-native";
import Background from "../components/Background";
import TextInput from "../components/TextInput";
import { emailValidator, passwordValidator, nameValidator } from "../core/Utils";
import { loginUser } from "../api/auth-api";
import Toast from "../components/Toast";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Hr from "../components/Hr.js"
import { Button} from "react-native-elements"
const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [name, setName] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const _onNextPressed = async () => {
        if (loading) return;

        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const nameError = nameValidator(name.value);

        if (emailError || passwordError || nameError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            setName({ ...name, error: nameError });
        }else{
            let userData = {
              u: name,
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
            <Text style={styles.title}> Regístrate ahora</Text>
            </View>
            <View style={styles.middle}>
            <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 }>
                <Image style={styles.fblogo} source={require('../../assets/facebook.png')}/>
                <Text style={styles.TextStyle}> Registrarse con Facebook </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.SubmitButtonStyle} activeOpacity = { .5 }>
                <Image style={styles.fblogo} source={require('../../assets/google.png')}/>
                <Text style={styles.TextStyle}> Registrarse con Google </Text>
            </TouchableOpacity>
            </View>
            <Hr text="o"/>

            <TextInput
                label="Usuario"
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
                textContentType="username"
            />

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
            <TouchableOpacity style={styles.nextButton} onPress={_onNextPressed}>
                <Text style={styles.nextButtonText}> Siguiente </Text>
                <Image style={styles.nextArrow} source={require('../../assets/next_24.png')}/>
            </TouchableOpacity>
            </View>


            <Toast message={error} onDismiss={() => setError("")} />
        </Background>
    );
};

const styles = StyleSheet.create({
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
    bottom: {
        marginTop: "20%",
        alignSelf: "flex-end",
        justifyContent: "center"
    },
    nextArrow: {
        width: 24,
        height: 24,
        alignSelf: "center"
    },
    backArrow: {
        width: 24,
        height: 24
    },
    nextButton: {
        
        width: 168,
        height: 48,
        borderRadius: 2,
        backgroundColor: "#0055ff",
        flexDirection : "row",
        justifyContent: "center"
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

    TextStyle:{
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

export default memo(RegisterScreen);