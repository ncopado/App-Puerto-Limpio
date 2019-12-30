import { Navigation } from "react-native-navigation";
import { SuscriptionsTabItem } from "./SuscriptionsTabItem";
import { TeamTabItem } from "./TeamTabItem";
import { AlertsTabItem } from "./AlertsTabItem";
import { TipsTabItem } from "./TipsTabItem";
import { MoreTabItem } from "./MoreTabItem";

export const goToAuth = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: "SignIn"
      }
    }
  });
};

export const RecoTab = {
  root: {
    bottomTabs: {
      id: "LPVTab",
      children: [SuscriptionsTabItem, AlertsTabItem, TipsTabItem, MoreTabItem]
    }
  }
};
