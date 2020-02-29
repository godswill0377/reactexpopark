import React, { memo } from "react";
import {
    ImageBackground,
    StyleSheet,
    View
} from "react-native";

const Background = ({ children }) => (
    <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="repeat"
        style={styles.background}
    >
        <View style={styles.container}>
            {children}
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%"
    },
    container: {
        flex: 1,
        padding: 20,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default memo(Background);