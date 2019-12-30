import firebase from "react-native-firebase";
import _ from "lodash";
import { ADD_SUSCRIPTION_ROLE } from "./ActionsTypes";
import { fetchDriverData } from "../FirebaseApi/FBDriver";
import { fetchActiveRoleForSuscription } from "../FirebaseApi/FBActiveRoles";
import { fetchRouteData } from "../FirebaseApi/FBRoutes";
import { fetchTruckData } from "../FirebaseApi/FBTruck";

export const fetchSuscriptionRoleAction = (suscriptionId, suscriptionName) => {
  return async dispatch => {
    try {
      const activeRole = await fetchActiveRoleForSuscription(suscriptionId);
      const driverData = await fetchDriverData(activeRole.conductorAsignado);
      const routeData = await fetchRouteData(suscriptionId);
      const truckData = await fetchTruckData(activeRole.unidadAsignada);

      const roleData = { driverData, routeData, truckData };

      dispatch({
        type: ADD_SUSCRIPTION_ROLE,
        payload: { role: roleData, suscriptionId }
      });
    } catch (error) {
      const roleData = {
        errorDescription: `La ruta ${suscriptionName} está programada en su horario habitual,una vez que se inicia el turno se mostrará la información.`
      };

      dispatch({
        type: ADD_SUSCRIPTION_ROLE,
        payload: {
          role: roleData,
          suscriptionId
        }
      });
    }
  };
};
