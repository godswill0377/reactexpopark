import React, { Component } from 'react';
import {
    Text,
    Animated,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    BackAndroid,
    BackHandler,
    StyleSheet,
    Dimensions
} from 'react-native';
const { height, width } = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    lottie: {
        height: 80,
        padding: 10,
        justifyContent: "center"
    },
    lottieView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    container: {
        flex: 1,
        flexDirection: "row",
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    overlay: {
        width: width,
        height: height,
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.5)'
    },
    contentContainer: {
        maxWidth: '80%',
        maxHeight: '100%',
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 10
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 5
    },
    title: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        fontFamily: "mont-bold",
        fontSize: 22,
        fontWeight: "bold",
        fontStyle: "italic",
        lineHeight: 32,
        letterSpacing: 0.5,
        textAlign: "center",
        color: "#090e1e"
    },
    message: {
        paddingTop: 5,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
        textAlign: "center",
        color: "#090e1e"
    },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        margin: 5,
        borderRadius: 5
    },
    buttonText: {
        color: '#fff',
        fontSize: 13
    }
});


const HwBackHandler = BackHandler || BackAndroid;
const HW_BACK_EVENT = 'hardwareBackPress';

export default class AwesomeAlert extends Component {
    constructor(props) {
        super(props);
        const { show } = this.props;
        this.springValue = new Animated.Value(0.3);

        this.state = {
            showSelf: false
        };

        if (show) this._springShow(true);
    }

    componentDidMount() {
        HwBackHandler.addEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
    }

    _springShow = fromConstructor => {
        this._toggleAlert(fromConstructor);
        Animated.spring(this.springValue, {
            toValue: 1,
            bounciness: 10
        }).start();
    };

    _springHide = () => {
        if (this.state.showSelf === true) {
            Animated.spring(this.springValue, {
                toValue: 0,
                tension: 10
            }).start();

            setTimeout(() => {
                this._toggleAlert();
                this._onDismiss();
            }, 70);
        }
    };

    _toggleAlert = fromConstructor => {
        if (fromConstructor) this.state = { showSelf: true };
        else this.setState({ showSelf: !this.state.showSelf });
    };

    _handleHwBackEvent = () => {
        const { closeOnHardwareBackPress } = this.props;
        if (this.state.showSelf && closeOnHardwareBackPress) {
            this._springHide();
            return true;
        } else if (!closeOnHardwareBackPress && this.state.showSelf) {
            return true;
        }

        return false;
    };

    _onTapOutside = () => {
        const { closeOnTouchOutside } = this.props;
        if (closeOnTouchOutside) this._springHide();
    };

    _onDismiss = () => {
        const { onDismiss } = this.props;
        onDismiss && onDismiss();
    };

    _renderButton = data => {
        const {
            text,
            backgroundColor,
            buttonStyle,
            buttonTextStyle,
            onPress
        } = data;

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.button, { backgroundColor }, buttonStyle]}>
                    <Text style={[styles.buttonText, buttonTextStyle]}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    _renderAlert = () => {
        const animation = { transform: [{ scale: this.springValue }] };

        const { lottie, lottieStyle } = this.props;
        const { showProgress } = this.props;
        const { title, message, customView = null } = this.props;

        const {
            showCancelButton,
            cancelText,
            cancelButtonColor,
            cancelButtonStyle,
            cancelButtonTextStyle,
            onCancelPressed
        } = this.props;
        const {
            showConfirmButton,
            confirmText,
            confirmButtonColor,
            confirmButtonStyle,
            confirmButtonTextStyle,
            onConfirmPressed
        } = this.props;

        const {
            alertContainerStyle,
            overlayStyle,
            progressSize,
            progressColor,
            contentContainerStyle,
            titleStyle,
            messageStyle
        } = this.props;

        const cancelButtonData = {
            text: cancelText,
            backgroundColor: cancelButtonColor,
            buttonStyle: cancelButtonStyle,
            buttonTextStyle: cancelButtonTextStyle,
            onPress: onCancelPressed
        };

        const confirmButtonData = {
            text: confirmText,
            backgroundColor: confirmButtonColor,
            buttonStyle: confirmButtonStyle,
            buttonTextStyle: confirmButtonTextStyle,
            onPress: onConfirmPressed
        };

        return (
            <View style={[styles.container, alertContainerStyle]}>
                <TouchableWithoutFeedback onPress={this._onTapOutside}>
                    <View style={[styles.overlay, overlayStyle]} />
                </TouchableWithoutFeedback>
                <Animated.View
                    style={[styles.contentContainer, animation, contentContainerStyle]}
                >
                    {lottie ? (
                        <LottieView style={styles.lottie} source={lottie} autoPlay loop />
                    ) : null}
                    <View style={styles.content}>
                        {showProgress ? (
                            <ActivityIndicator size={progressSize} color={progressColor} />
                        ) : null}

                        {title ? (
                            <Text style={[styles.title, titleStyle]}>{title}</Text>
                        ) : null}
                        {message ? (
                            <Text style={[styles.message, messageStyle]}>{message}</Text>
                        ) : null}
                        {customView}
                    </View>
                    <View style={styles.action}>
                        {showCancelButton ? this._renderButton(cancelButtonData) : null}
                        {showConfirmButton ? this._renderButton(confirmButtonData) : null}
                    </View>
                </Animated.View>
            </View>
        );
    };

    render() {
        const { showSelf } = this.state;

        if (showSelf) return this._renderAlert();

        return null;
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { show } = nextProps;
        const { showSelf } = this.state;

        if (show && !showSelf) this._springShow();
        else if (show === false && showSelf) this._springHide();
    }

    componentWillUnmount() {
        HwBackHandler.removeEventListener(HW_BACK_EVENT, this._handleHwBackEvent);
    }
}

AwesomeAlert.propTypes = {
    show: PropTypes.bool,
    showProgress: PropTypes.bool,
    title: PropTypes.string,
    message: PropTypes.string,
    closeOnTouchOutside: PropTypes.bool,
    closeOnHardwareBackPress: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    showConfirmButton: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    cancelButtonColor: PropTypes.string,
    confirmButtonColor: PropTypes.string,
    onCancelPressed: PropTypes.func,
    onConfirmPressed: PropTypes.func,
    customView: PropTypes.object
};

AwesomeAlert.defaultProps = {
    show: false,
    showProgress: false,
    closeOnTouchOutside: true,
    closeOnHardwareBackPress: true,
    showCancelButton: false,
    showConfirmButton: false,
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    cancelButtonColor: '#D0D0D0',
    confirmButtonColor: '#AEDEF4',
    customView: null
};
