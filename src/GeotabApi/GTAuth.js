import axios from "axios";
import { farm, host } from "./GTConstants";
import { GeoTabRequestBodyEncapsulator } from "./GTRequestEncapsulator";

export const signinToGT = () => {
  const body = new GeoTabRequestBodyEncapsulator("Authenticate", {
    database: "**********",
    userName: "**********",
    password: "**********"
  });

  return new Promise((resolve, reject) => {
    axios
      .post(`https://${farm}.${host}/apiv1`, body)
      .then(({ data }) => {
        const { result } = data;
        const { credentials } = result;
        resolve(credentials);
      })
      .catch(reason => reject());
  });
};
