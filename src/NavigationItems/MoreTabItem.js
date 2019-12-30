import { MORE_TOPBAR_TITLE } from "../StringValues";

export const MoreTabItem = {
  stack: {
    id: "ProfileStack",
    children: [
      {
        component: {
          name: "More",
          options: {
            topBar: {
              title: {
                text: MORE_TOPBAR_TITLE,
                fontFamily: "NeoSansPro-Bold",
                color: "gray"
              }
            },
            bottomTab: {
              // text: MORE_TOPBAR_TITLE,
              textColor: "gray",
              selectedTextColor: "#007aff",
              fontSize: 11,
              icon: require("../icons/menu.png"),
              selectedIconColor: "#007aff",
              iconColor: "gray"
            }
          }
        }
      }
    ]
  }
};
