<template>
  <ion-row style="margin-top: 10px">
    <ion-col size="5" class="imgCol">
      <img :src="currentCharacter.imgUrl" alt="No character picture found!" class="charImg">
    </ion-col>
    <ion-col class="pictureSide">

      <ion-item size="7" class="input nameField">
        <ion-label class="label" color="medium" position="stacked">Name</ion-label>
        <ion-input class="characterInput" v-model="currentCharacter.name" ref="input" type="text" :readonly="!editable"></ion-input>
      </ion-item>

      <ion-row class="input">
        <ion-col size="7" class="col">
          <ion-item>
            <ion-label class="label" color="medium" position="stacked">Height</ion-label>
            <ion-input v-model="currentCharacter.height" type="text" :readonly="!editable"></ion-input>
          </ion-item>
        </ion-col>

        <ion-col size="5" class="col">
          <ion-item>
            <ion-label class="label" color="medium" position="stacked">Age</ion-label>
            <ion-input v-model="currentCharacter.age" type="text" :readonly="!editable"></ion-input>
          </ion-item>
        </ion-col>
      </ion-row>

      <ion-item>
        <ion-label class="label" color="medium" position="stacked">Gender</ion-label>
        <ion-input v-model="currentCharacter.gender" type="text" :readonly="!editable"></ion-input>
      </ion-item>
    </ion-col>
  </ion-row>

  <ion-row>
    <ion-col size="6">
      <ion-item class="input">
        <ion-label class="label" color="medium" position="stacked">Physique</ion-label>
        <ion-input v-model="currentCharacter.physique" type="text" :readonly="!editable"></ion-input>
      </ion-item>
    </ion-col>

    <ion-col size="6">
      <ion-item class="input">
        <ion-label class="label" color="medium" position="stacked">Profession</ion-label>
        <ion-input v-model="currentCharacter.profession" type="text" :readonly="!editable"></ion-input>
      </ion-item>
    </ion-col>
  </ion-row>

  <ion-item class="input" style="margin-top: 0">
    <ion-label class="label" color="medium" position="stacked">Description</ion-label>
    <ion-textarea v-model="currentCharacter.description" type="text" :readonly="!editable"></ion-textarea>
  </ion-item>

  <ion-item class="input">
    <ion-label class="label" color="medium" position="stacked">Img-URL</ion-label>
    <ion-input v-model="currentCharacter.imgUrl" type="text" :readonly="!editable"></ion-input>
  </ion-item>

  <ion-content style="display: none">
    <AttributeList :name="'Attributes'" :list="currentCharacter.attributes" :type-level="null" :editLevel="false"></AttributeList>
  </ion-content>

  <ion-fab class="fab" vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button color="danger" @click="$emit('create')">
      <ion-icon id="fabIcon" :icon="bookOutline" ></ion-icon>
      <IonIcon :icon="brushOutline" class="penIcon" ></IonIcon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import {
  IonCol, IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTextarea
} from "@ionic/vue";
import AttributeList from "@/components/AttributeList";
import {useCharacterStore} from "@/stores/characters";
import { bookOutline, brushOutline } from "ionicons/icons";


export default {
  name: "CharacterSheet",
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonCol,
    IonRow,
    IonTextarea,
    AttributeList,
    IonFab,
    IonFabButton,
    IonIcon,
    IonContent
  },
  props: {
    editable: Boolean,
    currentCharacterInput: Object
  },
  data () {
    return {
      currentCharacter: {},
      attributesReady: false,
      imgUrl: 'https://i.pinimg.com/236x/2d/16/71/2d1671a4e725a28c99ef4b619af8a839.jpg'
    }
  },
  emits: [
      'create'
  ],
  watch: {
    currentCharacterInput(newCharacter) {
      this.currentCharacter = newCharacter
    }
  },
  mounted() {
    this.currentCharacter = this.currentCharacterInput;
  },
  setup () {
    const characterStore = useCharacterStore;
    return {
      characterStore,
      bookOutline,
      brushOutline
    }
  }
}
</script>

<style scoped>
.input {
  margin: 24px 0;
}
.col {
  padding: 0;
}
.fab {
  margin-bottom: 8vh;
}
.penIcon{
  margin-left: 20px;
  margin-bottom: 15px;
  position: absolute;
  font-size: 20px;
}
.charImg{
  width: 160px;
  height: 210px;
  object-fit: cover;
  box-shadow: 0 0 3px 1px #888888;
  border-radius: 8px;
  margin-top: 10px;
}
.imgCol{
  padding-right: 0;
  margin-left: 7px;
}
.pictureSide{
  margin-left: 8px;
}
.nameField{
  margin-top: 5px;
}

</style>
