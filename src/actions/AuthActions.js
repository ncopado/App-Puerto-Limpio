import {
  SIGNIN_IS_LOADING,
  SIGNUP_IS_LOADING,
  RESET_AUTH
} from "./ActionsTypes";
import { goToApp, goToAuth, goToOnboarding } from "../navigation";
import firebase from "react-native-firebase";
import { getFirstLaunch } from "../AsyncStorage";
import { signupToFB, signinToFB } from "../FirebaseApi/FBAuth";
import { showErrorMessage } from "../AlertMessages";
import { createUserData } from "../FirebaseApi/FBUserData";

export const createUseraInFirebaseAction = (
  email,
  password,
  name,
  lastname
) => {
  return async dispatch => {
    dispatch({ type: SIGNIN_IS_LOADING });
    try {
      const user = await signupToFB(email, password);
      await createUserData(user.uid, { name, email, lastname });
      navigateToApp();
      dispatch({ type: RESET_AUTH });
    } catch (error) {
      const localizedError = localizeError(error);
      dispatch({ type: RESET_AUTH });
      showErrorMessage(localizedError);
    }
  };
};

export const loginInFirebaseAction = (email, password) => {
  return async dispatch => {
    dispatch({ type: SIGNUP_IS_LOADING });
    try {
      await signinToFB(email, password);
      navigateToApp();
      dispatch({ type: RESET_AUTH });
    } catch (error) {
      const localizedError = localizeError(error);
      dispatch({ type: RESET_AUTH });
      showErrorMessage(localizedError);
    }
  };
};

const navigateToApp = async () => {
  try {
    await getFirstLaunch();
    goToApp();
  } catch (error) {
    goToOnboarding();
  }
};

const localizeError = code => {
  switch (code) {
    case "auth/invalid-email":
      return "Introduzca un email valido";
      break;
    case "auth/user-not-found":
      return "No existe un usuario con ese correo";
      break;
    case "auth/wrong-password":
      return "Contraseña incorrecta";
      break;
    case "auth/email-already-in-use":
      return "Ya existe una cuenta con ese correo";
      break;
    case "auth/weak-password":
      return "Contraseña muy debil,proporcione una contraseña mas compleja";
      break;
  }
};

export const resetAuthAction = () => {
  return dispatch => {
    dispatch({ type: RESET_AUTH });
  };
};
