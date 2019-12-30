export const TeamTabItem = {
  stack: {
    id: "TeamStack",
    children: [
      {
        component: {
          name: "Team",
          options: {
            topBar: {
              title: {
                text: "Personal"
              }
            },
            bottomTab: {
              text: "Personal",
              textColor: "gray",
              selectedTextColor: "#007aff",
              fontSize: 11,
              icon: require("../icons/driver.png"),
              selectedIconColor: "#007aff",
              iconColor: "gray"
            }
          }
        }
      }
    ]
  }
};
