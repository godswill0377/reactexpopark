'use strict';

import {memo} from "react";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const _createClass = function () {
    function defineProperties(target, props) {
        for (let i = 0; i < props.length; i++) {
            const descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _propTypes = require('prop-types');

const _propTypes2 = _interopRequireDefault(_propTypes);

const _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

const styles = _reactNative.StyleSheet.create({
    line: {
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        width: '100%',
        height: 1,
        backgroundColor: 'grey'
    },
    text: {
        flex: 1,
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15
    }
});

const Hr = function (_Component) {
    _inherits(Hr, _Component);

    function Hr(props) {
        _classCallCheck(this, Hr);

        const _this = _possibleConstructorReturn(this, (Hr.__proto__ || Object.getPrototypeOf(Hr)).call(this, props));

        _this.renderLine = _this.renderLine.bind(_this);
        _this.renderText = _this.renderText.bind(_this);
        _this.renderInner = _this.renderInner.bind(_this);
        return _this;
    }

    _createClass(Hr, [{
        key: 'renderLine',
        value: function renderLine(key) {
            return _react2.default.createElement(_reactNative.View, {
                key: key,
                style: [styles.line, this.props.lineStyle]
            });
        }
    }, {
        key: 'renderText',
        value: function renderText(key) {
            return _react2.default.createElement(
                _reactNative.View,
                {key: key},
                _react2.default.createElement(
                    _reactNative.Text,
                    {style: [styles.text, this.props.textStyle]},
                    this.props.text
                )
            );
        }
    }, {
        key: 'renderInner',
        value: function renderInner() {
            if (!this.props.text) {
                return this.renderLine();
            }
            return [this.renderLine(1), this.renderText(2), this.renderLine(3)];
        }
    }, {
        key: 'render',
        value: function render() {

            return _react2.default.createElement(
                _reactNative.View,
                {
                    style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginLeft: this.props.marginLeft,
                        marginRight: this.props.marginRight
                    }
                },
                this.renderInner()
            );
        }
    }]);

    return Hr;
}(_react.Component);

Hr.propTypes = {
    lineStyle: _propTypes2.default.shape({}),
    text: _propTypes2.default.string,
    marginLeft: _propTypes2.default.number,
    marginRight: _propTypes2.default.number,
    textStyle: _propTypes2.default.shape({})
};

Hr.defaultProps = {
    marginLeft: 0,
    marginRight: 0
};
export default memo(Hr);