<template>
  <ion-tab-bar class="tabBar">
    <div class="deplacer">
      <ion-button router-link="/Character" fill="clear" class="barButton" :class="{clicked: currentRoute === '/Character'}">
        <div>
          <ion-icon class="tabIcon" :icon="person"></ion-icon> <br>
          <ion-label class="tabText">Character</ion-label>
        </div>
      </ion-button>
      <ion-button router-link="/Attributes" fill="clear" class="barButton" :class="{clicked: currentRoute === '/Attributes'}">
        <div>
          <ion-icon class="tabIcon" :icon="library"></ion-icon> <br>
          <ion-label class="tabText">Attributes</ion-label>
        </div>
      </ion-button>
      <ion-button router-link="/Inventory" fill="clear" class="barButton" :class="{clicked: currentRoute === '/Inventory'}"><div>
        <ion-icon class="tabIcon" :icon="diamond"></ion-icon> <br>
        <ion-label class="tabText">Inventory</ion-label>
      </div></ion-button>
    </div>
  </ion-tab-bar>
</template>

<script>
import {IonButton, IonIcon, IonLabel, IonTabBar} from "@ionic/vue";
import { person, man, library, diamond } from "ionicons/icons";

export default {
  name: "TabBar",
  components: {
    IonTabBar,
    IonButton,
    IonIcon,
    IonLabel,
  },
  props: {
    currentRoute: String
  },
  setup() {
    return {
      person,
      man,
      library,
      diamond
    };
  }
}
</script>

<style scoped>

.tabBar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 5px 0px #888888;
}
.deplacer {
  margin-left: 2vh;
}
.barButton {
  margin-left: 0.7vh;
  margin-right: 0.7vh;
  height: 20vh;
  flex-flow: column;
  color: grey;
}
.clicked {
  color: red;
}
.tabText {
  font-size: 12px;
}
.tabIcon {
  font-size: 25px!important;
}

</style>
