<template>
  <ion-menu side="start">
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-title>Characters</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <ion-label v-for="(character, index) in characters" v-bind:key="index" > {{ character.name }} </ion-label>
    </ion-content>
  </ion-menu>
</template>

<script>
import {IonContent, IonHeader, IonLabel, IonMenu, IonTitle, IonToolbar} from "@ionic/vue";

export default {
  name: "CharacterMenu",
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLabel
  },
  props: {
    characters: []
  }
}
</script>

<style scoped>

</style>
