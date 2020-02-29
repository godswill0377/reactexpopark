import React, { memo } from "react";
import AppSlider from '../components/AppSlider.js'

const skipLabel = "Saltar";
const nextLabel = "Siguiente";
const prevLabel = "Anterior";
const doneLabel = "Empezar";
const slides = [
    {
        key: '1',
        title: 'Encuentra tu parking ahora',
        text: 'Parquick busca en tiempo real los parkings con plazas disponibles más cercanos a tu ubicación, o allí donde quieras ir',
        lottie: require('../../assets/lottie/onboarding1.json'),
        backgroundColor: 'white',
    },
    {
        key: '2',
        title: 'Ahorra tiempo y dinero.',
        text: 'Cada vez que usas Parquick, evitas conducir de más dando vueltas y vueltas, ahorrando tiempo, combustible y desgastes en tu coche.',
        lottie: require('../../assets/lottie/onboarding2.json'),
        backgroundColor: 'white',
    },
    {
        key: '3',
        title: 'Gana tiempo y ahorra',
        text: 'Evitas dar vueltas y vueltas, ganando tiempo, emitiendo menos CO2 y NOx, y ahorrando dinero en combustible y desgastes en tu coche.',
        lottie: require('../../assets/lottie/onboarding3.json'),
        backgroundColor: 'white',
    },
    {
        key: '4',
        title: '¡Ya has aparcado!',
        text: 'Además has contaminado menos y todo ello sin preocuparte y sin estrés :)',
        text2: 'Parquick no incluye el precio del parking, que será abonado directamente en el mismo.',
        lottie: require('../../assets/lottie/onboarding4.json'),
        backgroundColor: '#0055ff',
        titleStyle: 'white',
        textStyle: 'white'
    }
];
const IntroScreen = ({ navigation }) => (
    <AppSlider
        slides={slides}
        showSkipButton
        skipLabel={skipLabel}
        nextLabel={nextLabel}
        prevLabel={prevLabel}
        doneLabel={doneLabel}
        onDone={() => navigation.navigate("LoginOrRegister")}/>
);

export default memo(IntroScreen)