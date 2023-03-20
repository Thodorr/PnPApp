<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Characters</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="characters.length <= 0" style="height: 85%; display: flex; align-items: center; justify-content: center;">
        <ion-card class="emptyWarning" @click="addCharacter">
          <ion-card-header style="padding-bottom: 0">
            <ion-card-title class="emptyWarningText">Looks like you don't have any characters!</ion-card-title>
          </ion-card-header>
          <ion-card-content class="emptyWarningText">
            <ion-icon size="large" :icon="addCircleOutline"></ion-icon>
          </ion-card-content>
        </ion-card>
      </div>
      <ion-list style="background-color: var(--ion-background-color)" v-else>
        <character-card v-for="(character, index) in characters" v-bind:key="index"
                        :header="character.name"
                        :sub-header="character.profession"
                        :text="character.description"
                        :image-url="character.imgUrl" @click="openCharacter(character.id)"></character-card>
        <div class="ion-text-center">
          <ion-button @click="addCharacter" fill="clear" color="danger">
            <ion-icon size="large" :icon="addCircleOutline"></ion-icon>
          </ion-button>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {Character} from "@/model/Character";
import {DataController} from "@/stores/DataController";
import {addCircleOutline} from "ionicons/icons";
import {defineComponent} from "vue";
import {
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonPage,
  IonList,
  IonButton,
  IonToolbar,
  IonTitle,
  IonHeader, IonContent
} from "@ionic/vue";
import {useRouter} from "vue-router";
import CharacterCard from "@/components/CharacterCard.vue";

export default defineComponent({
  name: "SelectionPage",
  components: {
    CharacterCard,
    IonIcon,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonCardHeader,
    IonPage,
    IonList,
    IonButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent
  },
  data () {
    return {
      characters: [new Character(999,'', '', 0, '', '', 0,'','')] as Character[],
    }
  },
  methods: {
    async getCharacters () {
      this.characters = await this.dataController.getCharacters() as Character[];
    },
    async openCharacter (id: number) {
      await this.dataController.changeCurrentCharacter(id)
      await this.router.push('/Character/' + id)
    },
    async addCharacter () {
      await this.dataController.addCharacter();
      await this.router.push('/Character/new')
    }
  },
  updated () {
    this.getCharacters()
  },
  setup () {
    const dataController = new DataController();
    const router = useRouter();

    return {
      addCircleOutline,
      dataController,
      router
    }
  },
})

</script>

<style scoped>
.emptyWarning {
  border: 5px solid var(--ion-color-danger);
  border-radius: 25px;
  margin-left:  50px;
  margin-right: 50px;
  margin-top: 15px;
}
.emptyWarningText {
  text-align: center;
  color: var(--ion-color-danger);
  font-weight: bold;
  font-size: 20px;
}
</style>
