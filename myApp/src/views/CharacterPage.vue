<template>
  <ion-page>
    <ion-content>
      <div v-if="character !== null">
        <!--<top-bar @openMenu="openMenu" :attribute-points="0" class="front" @buttonClicked="editable = !editable"></top-bar>-->

        <!--<CharacterSheet @create="saveCharacter" :current-character-input="character" :editable="editable"></CharacterSheet>-->
        <CharacterSheetV2 @create="saveCharacter" :current-character-input="character" :editable="editable"></CharacterSheetV2>
      </div>

      <div v-else>
        <ion-label>No Characters</ion-label>
        <ion-button fill="clear" color="danger" @click="addCharacter">
          <ion-icon :icon="addCircleOutline"></ion-icon>
        </ion-button>
      </div>

      <ion-menu @ion-did-close="menuOpen=false" v-if="menuOpen" id="menu" menu-id="menu" side="start" content-Id="menuOutlet">
        <ion-header>
          <ion-toolbar color="danger">
            <ion-title>Characters</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding>
          <ion-list>
            <ion-item button @click="changeCharacters(character.id)" v-for="(character, index) in characters" v-bind:key="index" >
              <ion-label > {{ character.name }} </ion-label>
            </ion-item>
            <ion-button @click="addCharacter" style="margin-left: 120px;" fill="clear" color="danger">
              <ion-icon style="font-size: 30px;" :icon="addCircleOutline"></ion-icon>
            </ion-button>
          </ion-list>
        </ion-content>
      </ion-menu>

      <ion-router-outlet v-if="menuOpen" id="menuOutlet"></ion-router-outlet>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  menuController,
  toastController
} from "@ionic/vue";
import {addCircleOutline} from "ionicons/icons";
import CharacterSheetV2 from "@/components/CharacterSheetV2.vue";
import {DataController} from "@/stores/DataController";
import {defineComponent} from "vue";
import {Character} from "@/model/Character";

export default defineComponent({
  name: "CharacterPage",
  components: {
    IonRouterOutlet,
    IonLabel,
    IonButton,
    IonPage,
    IonIcon,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CharacterSheetV2,
    IonList,
    IonItem
  },
  data () {
    return {
      characters: [new Character(15,'', '', 0, '', '', 0,'','')],
      character: new Character(15,'', '', 0, '', '', 0,'','') as Character,
      editable: false,
      menuOpen: false,
    }
  },
  methods: {
    // Data
    async changeCharacters (index: number) {
      const newCharacter: Character = await this.dataController.changeCurrentCharacter(index) as Character;
      this.character = newCharacter;
      this.closeMenu();
    },
    async addCharacter () {
      this.editable = true;
      this.character = await this.dataController.addCharacter();
      this.closeMenu();
    },
    async saveCharacter () {
      await this.dataController.saveCharacter(this.character);
      await this.getCharacters();
      await this.openToast();
    },
    async getCurrentCharacter () {
      const character: Character = await this.dataController.getCurrentCharacter() as Character;
      this.character = character;
    },
    async getCharacters () {
      this.characters = await this.dataController.getCharacters() as Character[];
    },

    //UI
    openMenu () {
      this.menuOpen = !this.menuOpen;
      setTimeout(() => menuController.toggle());
    },
    closeMenu () {
      menuController.toggle();
      setTimeout(() => this.menuOpen = !this.menuOpen,300);
    },
    async openToast() {
      const toast = await toastController
          .create({
            message: 'Character saved',
            duration: 800
          })
      return toast.present();
    },
  },
  mounted() {
    this.getCurrentCharacter();
    this.getCharacters();
  },
  setup () {
    const dataController = new DataController();

    return {
      addCircleOutline,
      dataController
    }
  },
});
</script>

<style scoped>

</style>
