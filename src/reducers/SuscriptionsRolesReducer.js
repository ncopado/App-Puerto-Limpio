import { ADD_SUSCRIPTION_ROLE } from "../actions/ActionsTypes";
import _ from "lodash";

const INITIAL_STATE = { roles: {} };

export const suscriptionsRolesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SUSCRIPTION_ROLE:
      let { roles } = state;
      let { role, suscriptionId } = action.payload;
      roles[suscriptionId] = role;
      return {
        roles
      };
    default:
      return state;
  }
};
