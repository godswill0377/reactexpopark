import React, {memo} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Button
} from 'react-native';
import 'react-native-gesture-handler';
import {Theme} from "../core/Theme";
import LottieView from 'lottie-react-native';

const LoginOrRegister = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.invisible}>
            <Image style={styles.logo} source={require('../../assets/images/logo.png')}/>
        </View>

        <LottieView style={styles.imagenConductor} source={require('../../assets/lottie/drivers.json')} autoPlay loop />
        <View style={styles.body}>
            <View style={styles.bodyContent}>
                <Text style={styles.linea1}>¡Abróchate el cinturón!</Text>
                <Text style={styles.linea2}>Empieza ya tu prueba gratuita de 30 días.</Text>
                <Text style={styles.linea3}>Sin compromiso para continuar.{"\n"}Sin añadir método de
                    pago.</Text>


                <TouchableOpacity style={styles.botonAzul}
                                  onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.textoBlanco}>Regístrate ahora</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonBlanco}
                                  onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.textoAzul}>Acceder a mi cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);
export default memo(LoginOrRegister)

const styles = StyleSheet.create({

    invisible: {
        backgroundColor: "#fffFFF",
        height: 200,
        alignItems: 'center',
    },
    imagenConductor: {
        width: "70%",
        alignSelf: "center"
    },
    logo: {
        marginTop: 50,
        width: 78,
        height: 57,
    },
    body: {
    },
    bodyContent: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "space-between",
        padding: 30,
    },
    linea1: {
        width: 262,
        height: 24,
        marginTop: 10,
        fontFamily: "mont-bold",
        fontSize: 20,
        fontWeight: "bold",
        fontStyle: "italic",
        lineHeight: 24,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "#000000",
    },
    linea2: {
        width: 328,
        height: 24,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: "#000000",
        marginTop: 10
    },
    linea3: {
        width: 230,
        height: 50,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: "grey",
        marginTop: 30,
    },
    botonBlanco: {
        marginTop: 10,
        height: 48,
        width: "90%",
        borderRadius: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'white',
    },
    botonAzul: {
        marginTop: 20,
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
    textoAzul: {
        fontFamily: "mont-bold",
        fontSize: 14,
        fontWeight: "bold",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: '#0055ff'
    }
});
 