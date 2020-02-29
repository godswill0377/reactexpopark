import React, { memo, Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

class CustomCheckBox extends Component {

  constructor() {

    super();

    this.state = { checked: false }
  }

  toggleState() {
    this.setState({ checked: !this.state.checked });
    this.props.onCheck(!this.state.checked);
  }

  render() {
    return (

      <TouchableHighlight
        onPress={() => this.toggleState()}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: this.props.size, height: this.props.size, backgroundColor: this.props.color, padding: 3 }}>
            {
              (this.state.checked)
                ?
                (<View style={styles.checkedView}>
                  <Image source={require('../../assets/check.png')} style={styles.checkBoxImage} />
                </View>)
                :
                (<View style={styles.uncheckedView} />)
            }

          </View>

          {this.props.custom ?
           this.props.custom : 
          <Text style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}>{this.props.label}</Text>
          }

        </View>

      </TouchableHighlight>
    );
  }
}


const styles = StyleSheet.create(
    {
      MainContainer:
      {
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
      },
  
      selectedItemsButton:
      {
        marginTop: 25,
        padding: 8,
        backgroundColor: '#2962FF',
        alignSelf: 'stretch'
      },
  
      selectedItemsButton_Text:
      {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'stretch',
        fontSize: 18
      },
  
      checkedView:
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
  
      checkBoxImage:
      {
        height: '80%',
        width: '80%',
        tintColor: 'white',
        resizeMode: 'contain'
      },
  
      uncheckedView:
      {
        flex: 1,
        backgroundColor: 'white'
      },
  
      checkBoxLabelText:
      {
        paddingLeft: 10,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 12,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 16,
        letterSpacing: 0.3,
      }
    });

export default memo(CustomCheckBox);