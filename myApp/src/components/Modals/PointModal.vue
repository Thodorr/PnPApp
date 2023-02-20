<template>
  <ion-content>
    <div class="modalArea">
      <ion-item class="input">
        <ion-label class="label" color="danger" position="floating">Amount</ion-label>
        <ion-input v-model="amount" ref="input" type="number" :placeholder="amount.toString()" ></ion-input>
      </ion-item>
      <ion-button  expand="block" color="danger" :strong="true" @click="$emit('points', amount)">Confirm</ion-button>
    </div>
    <div class="pointText">
      <div>
        <ion-badge color="danger" class="usedPoints inner"> {{ usedPoints }} </ion-badge>
        <p class="inner landscapeHide"> Used Points </p>
      </div>
    </div>
  </ion-content>
</template>

<script>
import {IonBadge, IonButton, IonContent, IonInput, IonItem, IonLabel} from "@ionic/vue";

export default {
  name: "PointModal",
  components: {
    IonInput,
    IonLabel,
    IonItem,
    IonContent,
    IonButton,
    IonBadge
  },
  data () {
    return {
      amount: this.attributePoints
    }
  },
  props: {
    attributePoints: Number,
    usedPoints: Number
  }
}
</script>

<style scoped>
.input {
  margin-top: 15px;
  margin-bottom: 20px;
}
.pointText {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.usedPoints {
  top:50% !important;
  font-size: xx-large;
}
@media (orientation: landscape) {
  .pointText {
    height: 60%;
  }
}

</style>
