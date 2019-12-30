import { Alert } from "react-native";
import { Linking } from "react-native";

export const showNoLocationPermissionAllowedAlert = () => {
  Alert.alert(
    "No tenemos permisos para acceder a tu localización",
    "Permitenos obtener tu localización para continuar con la creación de tu suscripción",
    [{ text: "OK", onPress: () => {} }],
    { cancelable: false }
  );
};

export const showNoLocationsServicesEnabledAlert = () => {
  Alert.alert(
    "Servicios de localización desactivados",
    "Por favor activa tus servicios de localización para poder continuar con la creación de tu suscripción",
    [{ text: "OK", onPress: () => {} }],
    { cancelable: false }
  );
};

export const cantGetYourLocationAlert = () => {
  Alert.alert(
    "No podemos acceder a tu ubicación",
    null,
    [{ text: "OK", onPress: () => {} }],
    { cancelable: false }
  );
};

export const showOkMessage = (title, text, callback) => {
  Alert.alert(
    title,
    text,
    [
      {
        text: "OK",
        onPress: () => callback()
      }
    ],
    { cancelable: false }
  );
};

export const showConfirmationAlert = (
  title,
  text,
  onConfirmCallback,
  onCancelCallback
) => {
  Alert.alert(
    title,
    text,
    [
      {
        text: "Si",
        onPress: onConfirmCallback
      },
      {
        text: "No",
        onPress: onCancelCallback
      }
    ],
    { cancelable: false }
  );
};

export const showErrorMessage = (text, callBack) => {
  Alert.alert(
    "Oops!",
    text,
    [
      {
        text: "OK",
        onPress: () => {
          if (callBack) {
            callBack();
          }
        }
      }
    ],
    { cancelable: false }
  );
};

export const optionalMessage = (
  title,
  text,
  confirmText,
  cancelText,
  confirmCallback,
  cancelCallback
) => {
  Alert.alert(
    title,
    text,
    [
      {
        text: cancelText,
        onPress: () => {
          if (cancelCallback) {
            cancelCallback();
          }
        }
      },
      {
        text: confirmText,
        onPress: () => {
          if (confirmCallback) {
            confirmCallback();
          }
        }
      }
    ],
    { cancelable: false }
  );
};

export const noNotificationsPemissionsAlert = () => {
  Alert.alert(
    "Permitenos notificarte",
    "Las notificaciones te mantendran al tanto del servicio de limpia pública",
    [
      {
        text: "Cancelar",
        onPress: () => {}
      },
      {
        text: "Ir a configuraciones",
        onPress: () => Linking.openURL("app-settings://")
      }
    ],
    { cancelable: false }
  );
};
