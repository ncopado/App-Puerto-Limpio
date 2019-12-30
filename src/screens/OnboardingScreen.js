import React, { Component } from "react";
import { Image, LayoutAnimation, UIManager, Linking } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import BorderButton from "../components/common/BorderButton";
import { VER_BLUE_COLOR } from "../constants";
import fcmTokenManager, {
  deviceHasNotificationsPermission,
  requestNotificationPermissions,
  fetchTokenFromFirebase
} from "../Helpers/Notifications";
import { requestLocationPermissions } from "../Helpers/UserLocation";
import ColorButton from "../components/common/ColorButton";
import ColorText from "../components/common/ColorText";
import {
  getFirebaseToken,
  setFirebaseToken,
  setFirstLaunch
} from "../AsyncStorage";

import { goToApp } from "../navigation";
import { optionalMessage } from "../AlertMessages";

export default class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { locationServices: false, notifications: false };
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  componentDidMount = async () => {
    this.getLocationPermissions();
    this.getNotificationsPermissions();
  };

  render() {
    const { locationServices, notifications } = this.state;
    return (
      <Onboarding
        showSkip={false}
        onDone={this.onDoneHandler}
        nextLabel="Siguiente"
        pages={[
          {
            backgroundColor: "#fff",
            image: <Image style={{height:200}} resizeMode="contain" source={require("../icons/vertequiero.png")} />,
            title: "Bienvenido",
            subtitle:
              "El ayuntamiento de veracruz trae para ti Veracruz Limpio",
            subtitleStyles: { color: "black", fontSize: 18 }
          },
          {
            backgroundColor: "#fff",
            image: <Image style={{height:200}} resizeMode="contain"  source={require("../icons/OnboardingRSS.png")} />,
            title: "Te mantendremos informado!",
            subtitle:
              "Con el sistema de suscripciones te notificaremos de manera personalizada, osea que solo recibiras notificaciones relevantes para ti",
            subtitleStyles: { color: "black", fontSize: 18 }
          },
          {
            backgroundColor: "#fff",
            image: (
              <Image  style={{height:200}} resizeMode="contain"  source={require("../icons/OnboardingLocationPin.png")} />
            ),
            title:
              "Te ofrecemos un servicio de recolección de basura personalizado en base a tu Localización",
            subtitle: locationServices ? (
              <ColorText
                text="Servicios de localización activados, disfruta de un servicio personalizado"
                color="gray"
                fontSize={15}
              />
            ) : (
              <ColorButton
                title="Activar Servicios de Localización"
                color={VER_BLUE_COLOR}
                action={this.requestLocationPermissions}
              />
            ),
            titleStyles: { color: "black", fontSize: 18 }
          },
          {
            title:
              "Te notificaremos cuando el camión de basura este cerca de tu casa",
            titleStyles: { color: "black", fontSize: 18 },
            subtitle: notifications ? (
              <ColorText
                text="Notificaciones activadas, te mantendremos al tanto del servicio de limpia publica de veracruz"
                color="gray"
                fontSize={15}
              />
            ) : (
              <BorderButton
                title="Activar Notificaciones"
                color={VER_BLUE_COLOR}
                action={this.checkNotificationsPermissions}
              />
            ),
            backgroundColor: "#fff",
            image: (
              <Image style={{height:200}} resizeMode="contain"  source={require("../icons/OnboardingNotification.png")} />
            )
          }
        ]}
      />
    );
  }

  onDoneHandler = async () => {
    try {
      await setFirstLaunch();
      goToApp();
    } catch (error) {}
  };

  requestLocationPermissions = async () => {
    try {
      await requestLocationPermissions();
      this.locationsServicesActivated();
    } catch (error) {
      optionalMessage(
        "Localizacion Requerida",
        "Para poder ofrecerte un servicio personalizado requerimos que nos permitas accedes a tu localización",
        "Ir a Configuraciones",
        "Cancelar",
        this.openAppSettings
      );
    }
  };

  getLocationPermissions = async () => {
    try {
      await requestLocationPermissions();
      this.setState({ locationServices: true });
    } catch (error) {
      this.setState({ locationServices: false });
    }
  };

  getNotificationsPermissions = async () => {
    try {
      await deviceHasNotificationsPermission();
    } catch (error) {
      this.setState({ notifications: false });
    }
  };

  openAppSettings = () => {
    Linking.openURL("app-settings://");
  };

  configureNextAnimation = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  checkNotificationsPermissions = async () => {
    try {
      await deviceHasNotificationsPermission();
    } catch (error) {
      this.requestNotificationPermissions();
    }
  };

  requestNotificationPermissions = async () => {
    try {
      await requestNotificationPermissions();
      this.notificationActivated();
    } catch (error) {
      optionalMessage(
        "Permitenos notificarte",
        "Las notificaciones te mantendran al tanto del servicio de limpia publica",
        "Ir a Configuraciones",
        "Cancelar",
        this.openAppSettings
      );
    }
  };

  notificationActivated = () => {
    this.configureNextAnimation();
    this.setState({ notifications: true });
  };

  locationsServicesActivated = () => {
    this.configureNextAnimation();
    this.setState({ locationServices: true });
  };
}
