import { TIPS_TOPBAR_TITLE } from "../StringValues/";
import { YELLOW_COLOR } from "../constants";

export const TipsTabItem = {
  stack: {
    id: "TipsStack",
    children: [
      {
        component: {
          name: "Tips",
          options: {
            topBar: {
              title: {
                text: TIPS_TOPBAR_TITLE,
                fontFamily: "NeoSansPro-Bold",
                color: "gray"
              }
            },
            bottomTab: {
              // text: TIPS_TOPBAR_TITLE,
              textColor: "gray",
              selectedTextColor: YELLOW_COLOR,
              fontSize: 11,
              icon: require("../icons/tips.png"),
              selectedIconColor: YELLOW_COLOR,
              iconColor: "gray"
            }
          }
        }
      }
    ]
  }
};
