import { Navigation } from "react-native-navigation";
import { RecoTab } from "./NavigationItems/RecoTab";
import { SIGNUP_TOPBAR_TITLE, COMPOSE_RATE_TOPBAR_TITLE } from "./StringValues";

export const goToAuth = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: "SignIn"
      }
    }
  });
};

export const goToOnboarding = () => {
  Navigation.dismissAllModals();
  Navigation.setRoot({
    root: {
      component: {
        name: "Onboarding"
      }
    }
  });
};

export const goToApp = () => {
  Navigation.dismissAllModals();
  Navigation.setRoot(RecoTab);
};

export const presentSignupScreen = () => {
  Navigation.showModal({
    stack: {
      id: "SignUpStack",
      children: [
        {
          component: {
            name: "SignUp",
            options: { topBar: { title: { text: SIGNUP_TOPBAR_TITLE } } }
          }
        }
      ]
    }
  });
};

export const presentSuscriptionDetailScreen = suscription => {
  Navigation.showModal({
    stack: {
      id: "SuscriptionDetailStack",
      children: [
        {
          component: {
            name: "SuscriptionDetail",
            passProps: { suscription },
            options: {
              topBar: {
                title: { text: "Detalles" },
                subtitle: { text: suscription.name }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentSuscriptionSettingsScreen = suscription => {
  Navigation.showModal({
    stack: {
      id: "SuscriptionSettingStack",
      children: [
        {
          component: {
            name: "SuscriptionSetting",
            passProps: { suscription },
            options: {
              topBar: {
                title: {
                  text: "Configuraciones",
                  fontFamily: "NeoSansPro-Bold",
                  color: "gray"
                },
                subtitle: {
                  text: suscription.name,
                  fontFamily: "NeoSansPro-Bold",
                  color: "gray"
                }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentRateScreen = (geofenceName, geofenceId) => {
  Navigation.showModal({
    stack: {
      id: "ComposeRateStack",
      children: [
        {
          component: {
            name: "ComposeRate",
            passProps: { geofenceName, geofenceId },
            options: {
              topBar: {
                title: {
                  text: COMPOSE_RATE_TOPBAR_TITLE,
                  fontFamily: "NeoSansPro-Bold",
                  color: "gray"
                }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentNearScreen = userLocation => {
  Navigation.showModal({
    stack: {
      id: "NearStack",
      children: [
        {
          component: {
            name: "NearVehicles",
            passProps: { userLocation },
            options: {
              topBar: {
                title: {
                  text: "Cerca de ti",
                  fontFamily: "NeoSansPro-Bold",
                  color: "gray"
                }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentResetPasswordScreen = () => {
  Navigation.showModal({
    stack: {
      id: "ResetPasswordStack",
      children: [
        {
          component: {
            name: "ResetPassword",
            options: {
              topBar: {
                title: {
                  text: "Resetear tu contraseña",
                  fontFamily: "NeoSansPro-Bold",
                  color: "gray"
                }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentSuscriptionModalScreen = (
  stackId,
  screenName,
  suscription,
  title
) => {
  Navigation.showModal({
    stack: {
      id: stackId,
      children: [
        {
          component: {
            name: screenName,
            passProps: { suscription },
            options: {
              topBar: {
                title: { text: title },
                subtitle: suscription ? { text: suscription.name } : undefined
              }
            }
          }
        }
      ]
    }
  });
};

export const presentComposeSuscriptionScreen = userLocation => {
  Navigation.showModal({
    stack: {
      id: "ComposeSuscriptionStack",
      children: [
        {
          component: {
            name: "CreateSuscription",
            passProps: { userLocation },
            options: {
              topBar: {
                title: {
                  text: "Nueva Suscripción",
                  fontFamily: "NeoSansPro-Bold",
                  color: "gray"
                }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentVehicleLocationScreeen = (
  deviceId,
  geofenceId,
  geofenceName
) => {
  Navigation.showModal({
    stack: {
      id: "VehicleLocationStack",
      children: [
        {
          component: {
            name: "VehicleLocation",
            passProps: { deviceId, geofenceId },
            options: {
              topBar: {
                title: {
                  text: geofenceName,
                  fontFamily: "NeoSans-Medium",
                  color: "gray"
                }
              }
            }
          }
        }
      ]
    }
  });
};

export const presentNotificationsPermissionsScreen = () => {
  Navigation.showModal({
    stack: {
      id: "RequestNotificationPermissionsStack",
      children: [
        {
          component: {
            name: "RequestNotificationPermissions",
            options: { topBar: { title: { text: "Atención" } } }
          }
        }
      ]
    }
  });
};
