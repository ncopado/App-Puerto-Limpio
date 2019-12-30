import axios from "axios";
import { farm, host } from "./GTConstants";
import { GeoTabRequestBodyEncapsulator } from "./GTRequestEncapsulator";

export const fetchGTDevicesStatusIndo = credentials => {
  const body = new GeoTabRequestBodyEncapsulator("Get", {
    typeName: "DeviceStatusInfo",
    credentials: credentials
  });

  return new Promise((resolve, reject) => {
    axios
      .post(`https://${farm}.${host}/apiv1`, body)
      .then(({ data }) => {
        let { result } = data;
        resolve(result);
      })
      .catch(err => {
        reject();
      });
  });
};
