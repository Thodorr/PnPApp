<template>
  <ion-header :translucent="true">
    <ion-toolbar>

      <ion-button @click="$emit('openMenu')" v-if="currentRoute === '/Character'" slot="start" fill="clear" color="medium">
        <IonIcon :icon="menu"></IonIcon>
      </ion-button>

      <ion-button router-link="/Character" @click="$emit('backPressed')" v-if="currentRoute === '/Attributes'" slot="start" fill="clear" color="medium">
        <IonIcon :icon="arrowBack"></IonIcon>
      </ion-button>

      <ion-title class="ion-no-padding">{{ title }}</ion-title>
      <ion-button v-if="currentRoute === '/Attributes'" @click="$emit('openModal')" slot="end" fill="clear" color="danger">
        {{ attributePoints }}
      </ion-button>
      <ion-button slot="end" fill="clear" color="danger" @click="buttonClicked">
        <ion-icon class="icon iconButton" :icon="barIcon" :class="{grey: isClicked === false, red: isClicked}"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {IonButton, IonHeader, IonIcon, IonTitle, IonToolbar} from "@ionic/vue";
import {arrowBack, arrowUpCircleOutline, hammerOutline, menu} from "ionicons/icons";
import router from "@/router";

export default {
  name: "TopBar",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
  },
  props: {
    attributePoints: Number
  },
  data () {
    return {
      isClicked: false
    }
  },
  methods: {
    buttonClicked () {
      this.isClicked = !this.isClicked;
      this.$emit('buttonClicked');
    }
  },
  computed: {
    currentRoute () {
      return router.currentRoute.value.path
    },
    barIcon () {
      if (this.currentRoute === "/Character") {
        return this.hammerOutline
      } else {
        return arrowUpCircleOutline
      }
    },
    title () {
      const stringTitle = this.currentRoute.slice(1)
      return stringTitle;
    }
  },
  setup() {
    return {
      arrowUpCircleOutline,
      hammerOutline,
      arrowBack,
      menu
    };
  }
}
</script>

<style scoped>
.icon {
  font-size: 30px;
  color: grey;
}
.grey {
  color: grey;
}
.red {
  color: #ff4961;
}

</style>
