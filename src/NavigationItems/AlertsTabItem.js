import { ALERTS_TOPBAR_TITLE } from "../StringValues";
import { BLUE_COLOR } from "../constants";

export const AlertsTabItem = {
  stack: {
    id: "AlertsStack",
    children: [
      {
        component: {
          name: "Alerts",
          options: {
            topBar: {
              title: {
                text: ALERTS_TOPBAR_TITLE,
                fontFamily: "NeoSansPro-Bold",
                color: "gray"
              }
            },
            bottomTab: {
           
              textColor: "gray",
              selectedTextColor: BLUE_COLOR,
              fontSize: 11,
              icon: require("../icons/alerts.png"),
              selectedIconColor: BLUE_COLOR,
              iconColor: "gray"
            }
          }
        }
      }
    ]
  }
};
