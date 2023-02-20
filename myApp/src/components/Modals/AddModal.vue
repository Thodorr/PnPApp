<template>
  <ion-content>
    <div>
      <ion-item class="input">
        <ion-label class="label" color="danger" position="floating">Name</ion-label>
        <ion-input v-model="name" ref="input" type="text" ></ion-input>
      </ion-item>
      <ion-select v-model="typeString" interface="popover" :placeholder="typeString">
        <ion-select-option value="Body">Body</ion-select-option>
        <ion-select-option value="Mind">Mind</ion-select-option>
        <ion-select-option value="Social">Social</ion-select-option>
      </ion-select>
      <ion-item class="input">
        <ion-label class="label" color="danger" position="floating">Amount</ion-label>
        <ion-input v-model="amount" ref="input" type="number" placeholder="0" ></ion-input>
      </ion-item>
      <ion-button  expand="block" color="danger" :strong="true" @click="buildAttribute">Confirm</ion-button>
      <ion-button  expand="block" color="danger" :strong="true" @click="$emit('close')" style="margin-top: 15px">Cancel</ion-button>
    </div>
  </ion-content>
</template>

<script>
import {IonButton, IonContent, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption} from "@ionic/vue";
import {Attribute, Type} from "@/model/Attribute";

export default {
  name: "addModal",
  components: {
    IonInput,
    IonLabel,
    IonItem,
    IonContent,
    IonButton,
    IonSelect,
    IonSelectOption
  },
  data () {
    return {
      name: "",
      amount: Number,
      typeString: String
    }
  },
  methods: {
    buildAttribute() {
      let type = Type.Body;
      switch (this.typeString) {
        case "Body":
          type = Type.Body;
          break;
        case "Mind":
          type = Type.Mind;
          break;
        case "Social":
          type = Type.Social;
          break;
        default:
          type = Type.Body;
          break;
      }
      this.amount = Number(this.amount);
      if (isNaN(this.amount)) this.amount = 0;
      this.$emit('create', new Attribute(this.name, type, this.amount))
    }
  },
  props: {
    currentType: Type.Body
  },
  mounted() {
    switch (this.currentType) {
      case Type.Body:
        this.typeString = "Body";
        break;
      case Type.Mind:
        this.typeString = "Mind";
        break;
      case Type.Social:
        this.typeString = "Social";
        break;
      default:
        this.typeString = "Body";
        break;
    }
  }
}
</script>

<style scoped>
.label {
  color: grey;
}
.input {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>
