import {DefaultTheme} from "react-native-paper";

const SIZES = {
    base: 12,
    icon: 15,
    font: 16,
};
const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#0055ff",
        secondary: "#899fdc",
        error: "#f13a59",
        success: "#00B386",
        white: '#FFFFFF',
        overlay: '#C1BEC0',
    }
};

export {
    Theme,
    SIZES,
}
