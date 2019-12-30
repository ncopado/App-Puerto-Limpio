import { SUSCRIPTIONS_TOPBAR_TITLE } from "../StringValues/SuscriptionsValues";
import { BLUE_COLOR, LIME_GREEN_COLOR } from "../constants";

export const SuscriptionsTabItem = {
  stack: {
    id: "SuscriptionsStack",
    children: [
      {
        component: {
          name: "Suscriptions",
          options: {
            topBar: {
              title: {
                text: SUSCRIPTIONS_TOPBAR_TITLE,
                fontFamily: "NeoSansPro-Bold",
                color: "gray"
              }
            },
            bottomTab: {
              // text: SUSCRIPTIONS_TOPBAR_TITLE,
              textColor: "gray",
              selectedTextColor: LIME_GREEN_COLOR,
              fontSize: 10,
              icon: require("../icons/rss.png"),
              selectedIconColor: LIME_GREEN_COLOR,
              iconColor: "gray"
            }
          }
        }
      }
    ]
  }
};
