import axios from "axios";
import { farm, host } from "./GTConstants";
import { GeoTabRequestBodyEncapsulator } from "./GTRequestEncapsulator";

export const fetchGTRoutes = credentials => {
  const body = new GeoTabRequestBodyEncapsulator("Get", {
    typeName: "Zone",
    credentials: credentials
  });

  return new Promise((resolve, reject) => {
    axios
      .post(`https://${farm}.${host}/apiv1`, body)
      .then(({ data }) => {
        const { result } = data;
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};
