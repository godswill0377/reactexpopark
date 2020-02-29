import React from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';

const ParksInfoModal = props => (
    <View style={{marginTop: 22}}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                console.log('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
                <View>
                    <Text>Hello World!</Text>
                    <TouchableHighlight
                        onPress={() =>
                            !props.modalVisible
                        }>
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </Modal>

        <TouchableHighlight
            onPress={() =>
                props.modalVisible = true
            }>
            <Text>Show Modal</Text>
        </TouchableHighlight>
    </View>

);
export default ParksInfoModal;