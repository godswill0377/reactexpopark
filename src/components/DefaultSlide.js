import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import InfoLogo from '../../assets/svg/info_24.svg'

export default class DefaultSlide extends React.PureComponent {
  
  render() {
    const { item, dimensions, bottomButton } = this.props;
    const style = {
      flex: 1,
      backgroundColor: item.backgroundColor,
      width: dimensions.width,
      paddingBottom: bottomButton ? 132 : 64,
    };
    const textStyle = {
        color: item.textStyle
    };
    const titleStyle = {
        color: item.textStyle
    };
    const text2 = item.text2 ? renderNote(item.text2) : null;
    return (
      <View style={[styles.mainContent, style]}>
          <LottieView style={styles.lottie} source={item.lottie} autoPlay loop />
          <Text style={[styles.title, titleStyle]}>{item.title}</Text>
          <Text style={[styles.text2, textStyle]}>{item.text}</Text>
          {text2}
      </View>
    );
  }
}

function renderNote( text){
  return (
    <View>
      <InfoLogo style={styles.icon}/>
      <Text style={[styles.text2]}>{text}</Text>
    </View>
  );

}
const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24
    },
    lottie: {
        width: "100%",
    },
    mainContent: {
      flex: 1,
      alignItems: 'center',
        flexDirection: "column",
      justifyContent: 'space-around',
    },
    image: {

    },
    text: {
      width: "80%",
      fontFamily: "TT-Hoves-Regular",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: 24,
      letterSpacing: 0.3,
      textAlign: "center",
      color: "black"
    },
    text2: {
      width: "80%",
      fontFamily: "TT-Hoves-Regular",
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      lineHeight: 16,
      letterSpacing: 0.3,
      textAlign: "center",
      color: "#cae9ff"
    },
    title: {
      width: 299,
      height: 24,
      fontFamily: "mont-boldItalic",
      fontSize: 20,
      fontWeight: "bold",
      fontStyle: "italic",
      lineHeight: 24,
      letterSpacing: 0.5,
      textAlign: "center",
      color: "black"
    },
  });
  
