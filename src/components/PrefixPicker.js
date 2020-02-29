import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';

const styles = StyleSheet.create({
    picker: {
        width: 110,
        height: 48,
        borderRadius: 1,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#899fdc"
    },
    itemStyle: {
        width: 110,
        height: 48,
        fontFamily: "TT-Hoves-Regular",
        fontSize: 14,
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 24,
        letterSpacing: 0.3,
    }
});
export default class PrefixPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: "+34"
        }
    };

    handlePicker = (val) => {
        this.setState({ language: val })
        this.props.handlePicker?.(val);
    }
    render() {
        return (
            <Picker
                selectedValue={this.state.language}
                style={styles.picker}
                itemStyle={styles.itemStyle}
                onValueChange={(itemValue, itemIndex) =>
                    this.handlePicker(itemValue)
                }>
                <Picker.Item label="+1" value="+1" />
                <Picker.Item label="+20" value="+20" />
                <Picker.Item label="+211" value="+211" />
                <Picker.Item label="+212" value="+212" />
                <Picker.Item label="+213" value="+213" />
                <Picker.Item label="+216" value="+216" />
                <Picker.Item label="+218" value="+218" />
                <Picker.Item label="+220" value="+220" />
                <Picker.Item label="+221" value="+221" />
                <Picker.Item label="+222" value="+222" />
                <Picker.Item label="+223" value="+223" />
                <Picker.Item label="+224" value="+224" />
                <Picker.Item label="+225" value="+225" />
                <Picker.Item label="+226" value="+226" />
                <Picker.Item label="+227" value="+227" />
                <Picker.Item label="+228" value="+228" />
                <Picker.Item label="+229" value="+229" />
                <Picker.Item label="+230" value="+230" />
                <Picker.Item label="+231" value="+231" />
                <Picker.Item label="+232" value="+232" />
                <Picker.Item label="+233" value="+233" />
                <Picker.Item label="+234" value="+234" />
                <Picker.Item label="+235" value="+235" />
                <Picker.Item label="+236" value="+236" />
                <Picker.Item label="+237" value="+237" />
                <Picker.Item label="+238" value="+238" />
                <Picker.Item label="+239" value="+239" />
                <Picker.Item label="+240" value="+240" />
                <Picker.Item label="+241" value="+241" />
                <Picker.Item label="+242" value="+242" />
                <Picker.Item label="+243" value="+243" />
                <Picker.Item label="+244" value="+244" />
                <Picker.Item label="+245" value="+245" />
                <Picker.Item label="+246" value="+246" />
                <Picker.Item label="+248" value="+248" />
                <Picker.Item label="+249" value="+249" />
                <Picker.Item label="+250" value="+250" />
                <Picker.Item label="+251" value="+251" />
                <Picker.Item label="+252" value="+252" />
                <Picker.Item label="+253" value="+253" />
                <Picker.Item label="+254" value="+254" />
                <Picker.Item label="+255" value="+255" />
                <Picker.Item label="+256" value="+256" />
                <Picker.Item label="+257" value="+257" />
                <Picker.Item label="+258" value="+258" />
                <Picker.Item label="+260" value="+260" />
                <Picker.Item label="+261" value="+261" />
                <Picker.Item label="+262" value="+262" />
                <Picker.Item label="+264" value="+264" />
                <Picker.Item label="+265" value="+265" />
                <Picker.Item label="+266" value="+266" />
                <Picker.Item label="+267" value="+267" />
                <Picker.Item label="+268" value="+268" />
                <Picker.Item label="+269" value="+269" />
                <Picker.Item label="+27" value="+27" />
                <Picker.Item label="+290" value="+290" />
                <Picker.Item label="+291" value="+291" />
                <Picker.Item label="+297" value="+297" />
                <Picker.Item label="+298" value="+298" />
                <Picker.Item label="+299" value="+299" />
                <Picker.Item label="+30" value="+30" />
                <Picker.Item label="+31" value="+31" />
                <Picker.Item label="+32" value="+32" />
                <Picker.Item label="+33" value="+33" />
                <Picker.Item label="+34" value="+34" />
                <Picker.Item label="+350" value="+350" />
                <Picker.Item label="+351" value="+351" />
                <Picker.Item label="+352" value="+352" />
                <Picker.Item label="+353" value="+353" />
                <Picker.Item label="+354" value="+354" />
                <Picker.Item label="+355" value="+355" />
                <Picker.Item label="+356" value="+356" />
                <Picker.Item label="+357" value="+357" />
                <Picker.Item label="+358" value="+358" />
                <Picker.Item label="+359" value="+359" />
                <Picker.Item label="+36" value="+36" />
                <Picker.Item label="+370" value="+370" />
                <Picker.Item label="+371" value="+371" />
                <Picker.Item label="+372" value="+372" />
                <Picker.Item label="+373" value="+373" />
                <Picker.Item label="+374" value="+374" />
                <Picker.Item label="+375" value="+375" />
                <Picker.Item label="+376" value="+376" />
                <Picker.Item label="+377" value="+377" />
                <Picker.Item label="+378" value="+378" />
                <Picker.Item label="+380" value="+380" />
                <Picker.Item label="+381" value="+381" />
                <Picker.Item label="+382" value="+382" />
                <Picker.Item label="+385" value="+385" />
                <Picker.Item label="+386" value="+386" />
                <Picker.Item label="+387" value="+387" />
                <Picker.Item label="+389" value="+389" />
                <Picker.Item label="+39" value="+39" />
                <Picker.Item label="+40" value="+40" />
                <Picker.Item label="+41" value="+41" />
                <Picker.Item label="+420" value="+420" />
                <Picker.Item label="+421" value="+421" />
                <Picker.Item label="+423" value="+423" />
                <Picker.Item label="+43" value="+43" />
                <Picker.Item label="+44" value="+44" />
                <Picker.Item label="+45" value="+45" />
                <Picker.Item label="+46" value="+46" />
                <Picker.Item label="+47" value="+47" />
                <Picker.Item label="+48" value="+48" />
                <Picker.Item label="+49" value="+49" />
                <Picker.Item label="+500" value="+500" />
                <Picker.Item label="+501" value="+501" />
                <Picker.Item label="+502" value="+502" />
                <Picker.Item label="+503" value="+503" />
                <Picker.Item label="+504" value="+504" />
                <Picker.Item label="+505" value="+505" />
                <Picker.Item label="+506" value="+506" />
                <Picker.Item label="+507" value="+507" />
                <Picker.Item label="+508" value="+508" />
                <Picker.Item label="+509" value="+509" />
                <Picker.Item label="+51" value="+51" />
                <Picker.Item label="+52" value="+52" />
                <Picker.Item label="+53" value="+53" />
                <Picker.Item label="+54" value="+54" />
                <Picker.Item label="+55" value="+55" />
                <Picker.Item label="+56" value="+56" />
                <Picker.Item label="+57" value="+57" />
                <Picker.Item label="+58" value="+58" />
                <Picker.Item label="+590" value="+590" />
                <Picker.Item label="+591" value="+591" />
                <Picker.Item label="+592" value="+592" />
                <Picker.Item label="+593" value="+593" />
                <Picker.Item label="+594" value="+594" />
                <Picker.Item label="+595" value="+595" />
                <Picker.Item label="+596" value="+596" />
                <Picker.Item label="+597" value="+597" />
                <Picker.Item label="+598" value="+598" />
                <Picker.Item label="+599" value="+599" />
                <Picker.Item label="+60" value="+60" />
                <Picker.Item label="+61" value="+61" />
                <Picker.Item label="+62" value="+62" />
                <Picker.Item label="+63" value="+63" />
                <Picker.Item label="+64" value="+64" />
                <Picker.Item label="+65" value="+65" />
                <Picker.Item label="+66" value="+66" />
                <Picker.Item label="+670" value="+670" />
                <Picker.Item label="+672" value="+672" />
                <Picker.Item label="+673" value="+673" />
                <Picker.Item label="+674" value="+674" />
                <Picker.Item label="+675" value="+675" />
                <Picker.Item label="+676" value="+676" />
                <Picker.Item label="+677" value="+677" />
                <Picker.Item label="+678" value="+678" />
                <Picker.Item label="+679" value="+679" />
                <Picker.Item label="+680" value="+680" />
                <Picker.Item label="+681" value="+681" />
                <Picker.Item label="+682" value="+682" />
                <Picker.Item label="+683" value="+683" />
                <Picker.Item label="+685" value="+685" />
                <Picker.Item label="+686" value="+686" />
                <Picker.Item label="+687" value="+687" />
                <Picker.Item label="+688" value="+688" />
                <Picker.Item label="+689" value="+689" />
                <Picker.Item label="+690" value="+690" />
                <Picker.Item label="+691" value="+691" />
                <Picker.Item label="+692" value="+692" />
                <Picker.Item label="+7" value="+7" />
                <Picker.Item label="+81" value="+81" />
                <Picker.Item label="+82" value="+82" />
                <Picker.Item label="+84" value="+84" />
                <Picker.Item label="+850" value="+850" />
                <Picker.Item label="+852" value="+852" />
                <Picker.Item label="+853" value="+853" />
                <Picker.Item label="+855" value="+855" />
                <Picker.Item label="+856" value="+856" />
                <Picker.Item label="+86" value="+86" />
                <Picker.Item label="+880" value="+880" />
                <Picker.Item label="+886" value="+886" />
                <Picker.Item label="+90" value="+90" />
                <Picker.Item label="+91" value="+91" />
                <Picker.Item label="+92" value="+92" />
                <Picker.Item label="+93" value="+93" />
                <Picker.Item label="+94" value="+94" />
                <Picker.Item label="+95" value="+95" />
                <Picker.Item label="+960" value="+960" />
                <Picker.Item label="+961" value="+961" />
                <Picker.Item label="+962" value="+962" />
                <Picker.Item label="+963" value="+963" />
                <Picker.Item label="+964" value="+964" />
                <Picker.Item label="+965" value="+965" />
                <Picker.Item label="+966" value="+966" />
                <Picker.Item label="+967" value="+967" />
                <Picker.Item label="+968" value="+968" />
                <Picker.Item label="+970" value="+970" />
                <Picker.Item label="+971" value="+971" />
                <Picker.Item label="+972" value="+972" />
                <Picker.Item label="+973" value="+973" />
                <Picker.Item label="+974" value="+974" />
                <Picker.Item label="+975" value="+975" />
                <Picker.Item label="+976" value="+976" />
                <Picker.Item label="+977" value="+977" />
                <Picker.Item label="+98" value="+98" />
                <Picker.Item label="+992" value="+992" />
                <Picker.Item label="+993" value="+993" />
                <Picker.Item label="+994" value="+994" />
                <Picker.Item label="+995" value="+995" />
                <Picker.Item label="+996" value="+996" />
                <Picker.Item label="+998" value="+998" />

            </Picker>
        )
    }


}