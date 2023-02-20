<template>
    <ion-tab-bar class="tabBar">
        <div class="deplacer">
          <ion-button fill="clear" class="barButton" :class="{clicked: isClicked === Type.Body}" @click="tabClicked(Type.Body)">
            <div>
              <ion-icon :icon="barbell"></ion-icon> <br>
              <ion-label>Body</ion-label>
            </div>
          </ion-button>
          <ion-button fill="clear" class="barButton" :class="{clicked: isClicked === Type.Mind}" @click="tabClicked(Type.Mind)">
            <div>
              <ion-icon :icon="school"></ion-icon> <br>
              <ion-label>Mind</ion-label>
            </div>
          </ion-button>
          <ion-button fill="clear" class="barButton" :class="{clicked: isClicked === Type.Social}" @click="tabClicked(Type.Social)"><div>
            <ion-icon :icon="people"></ion-icon> <br>
            <ion-label>Social</ion-label>
          </div></ion-button>
        </div>
    </ion-tab-bar>
</template>

<script>
import {IonButton, IonIcon, IonLabel, IonTabBar} from "@ionic/vue";
import {Type} from "@/model/Attribute";
import { barbell, people, school, barbellOutline, peopleOutline, schoolOutline } from "ionicons/icons";

export default {
  name: "AttributeTabs",
  components: {
    IonTabBar,
    IonButton,
    IonIcon,
    IonLabel,

  },
  setup() {
    return {
      Type,
      barbell,
      people,
      school,
      barbellOutline,
      peopleOutline,
      schoolOutline
    };
  },
  data () {
    return {
      isClicked: Type.Body
    }
  },
  methods: {
    tabClicked (type) {
      this.$emit('tab', type)
      this.isClicked = type
    }
  }
}
</script>

<style scoped>

.tabBar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  box-shadow: 0 0 5px grey;
}
.deplacer {
  margin-left: 2vh;
}
.barButton {
  margin-left: 1.4vh;
  margin-right: 2vh;
  height: 20vh;
  flex-flow: column;
  color: grey;
}
.clicked {
  color: red;
}

</style>
