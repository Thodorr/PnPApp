<template>
  <ion-page>
    <ion-content>
      <AttributeList v-if="addModalOpen === false" @levelUp="addItem" @delete="removeItem"
                     :name="'Inventory'" :list="itemList" :type-level="0" :editLevel="false"></AttributeList>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {Item} from "@/model/Item";
import {IonContent, IonPage} from "@ionic/vue";
import AttributeList from "@/components/AttributeList.vue";
import {defineComponent} from "vue";
import {DataController} from "@/stores/DataController";

export default defineComponent({
  name: "InventoryPage",
  components: {
    IonPage,
    IonContent,
    AttributeList
  },
  data (){
    return {
      itemList: [ new Item('Shovel',5)  ],
      addModalOpen: false,
    }
  },
  methods: {
    async addItem (item: Item) {
      this.itemList = await this.dataController.addItem(item);
    },
    async removeItem (item: Item) {
      this.itemList = await this.dataController.removeItem(item)
    },
    async getItems () {
      this.itemList = await this.dataController.getItems();
    }
  },
  mounted () {
    this.getItems()
  },
  setup() {
    const dataController: DataController = new DataController();

    return {
      Item,
      dataController
    };
  },
  ionViewWillEnter() {
    this.getItems();
  },
});
</script>

<style scoped>

</style>
