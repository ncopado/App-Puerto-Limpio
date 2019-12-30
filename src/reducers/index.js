import { AuthReducer } from "./AuthReducer";
import { combineReducers } from "redux";
import { routesReducer } from "./GeofencesReducer";
import { createSuscriptionReducer } from "./CreateSuscriptionReducer";
import { suscriptionsReducer } from "./SuscriptionsReducer";
import { devicesInfoReducer } from "./DevicesInfoReducers";
import { userLocationReducer } from "./UserLocationReducer";
import { suscriptionsCancelationReducer } from "./SuscriptionCancelationReducer";
import { especificGeofenceReducer } from "./EspecificGeofenceReducer";
import { geofenceDetailReducer } from "./GeofenceDetailReducer";
import { vehicleDetailReducer } from "./VehicleDetailReducer";
import { driverDetailReducer } from "./DriverDetailReducer";
import { deviceStatusReducer } from "./DeviceStatusReducer";
import { driversReducer } from "./DriversReducer";
import { vehiclesReducer } from "./VehiclesReducer";
import { createRateReducer } from "./CreateRateReducer";
import { alertsReducer } from "./AlertsReducer";
import { GeoTabAuthReducer } from "./GeoTabAuthReducer";
import { tipsReducer } from "./TipReducer";
import { vehiclesStatusReducer } from "./VehiclesStatusReducer";
import { suscriptionsRolesReducer } from "./SuscriptionsRolesReducer";
import { deviceLocationReducer } from "./GTDeviceLocationReducer";

export default combineReducers({
  AuthReducer,
  routesReducer,
  createSuscriptionReducer,
  suscriptionsReducer,
  devicesInfoReducer,
  userLocationReducer,
  suscriptionsCancelationReducer,
  especificGeofenceReducer,
  geofenceDetailReducer,
  vehicleDetailReducer,
  driverDetailReducer,
  deviceStatusReducer,
  driversReducer,
  vehiclesReducer,
  createRateReducer,
  alertsReducer,
  GeoTabAuthReducer,
  tipsReducer,
  vehiclesStatusReducer,
  suscriptionsRolesReducer,
  deviceLocationReducer
});
