import React, { Component } from 'react';
import { Polyline } from 'react-native-maps';

const parquickServer = 'https://control.parquick.com:1787/directions'

class MapViewDirections extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coordinates: props.coordinates,
            distance: null,
            duration: null,
            steps: null,

        };
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (prevProps.coordinates != this.state.coordinates) {
            this.setState({ coordinates: this.props.coordinates })
        }
    }
    resetState = (cb = null) => {
        console.log("reset state")
        this.setState({
            coordinates: null,
            distance: null,
            duration: null,
        }, cb);
    }
    render() {

        return this.state.coordinates ?
            <Polyline coordinates={this.state.coordinates} strokeColor={this.props.lineColor ? this.props.lineColor : "blue"}
                strokeWidth={6} />
            : null;
    }

}
export default MapViewDirections;