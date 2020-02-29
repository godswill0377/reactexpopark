import React, { memo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { Theme } from "../core/Theme.js";

const TextInput = ({ errorText, ...props }) => (
    <View style={styles.container}>
        <Input
            style={styles.input}
            selectionColor={Theme.colors.primary}
            underlineColor="transparent"
            mode="outlined"
            {...props}
        />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: 328,
        height: 48,
        marginVertical: 24,
        marginLeft: -20
    },
    input: {
        backgroundColor: Theme.colors.surface
    },
    error: {
        fontSize: 14,
        color: Theme.colors.error,
        paddingHorizontal: 4,
        paddingTop: 4
    }
});

export default memo(TextInput);