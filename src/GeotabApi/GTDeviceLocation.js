import axios from "axios";
import { farm, host } from "./GTConstants";
import { GeoTabRequestBodyEncapsulator } from "./GTRequestEncapsulator";

export const fetchDeviceLocation = (credentials, deviceId) => {
  const body = new GeoTabRequestBodyEncapsulator("Get", {
    typeName: "DeviceStatusInfo",
    credentials: credentials,
    search: { deviceSearch: { id: deviceId } }
  });

  return new Promise((resolve, reject) => {
    axios
      .post(`https://${farm}.${host}/apiv1`, body)
      .then(({ data }) => {
        let { result } = data;
        resolve(result[0]);
      })
      .catch(err => {
        reject(err);
      });
  });
};
