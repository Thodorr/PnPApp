<template>
  <ion-list-header class="listHeader">
    {{ name }}
    <ion-badge color="danger" class="headerBadge">{{ typeLevel }}</ion-badge>
  </ion-list-header>
  <ion-list>
    <ion-item v-for="(item, index) in list" v-bind:key="index">
      <ion-button @click="$emit('delete', item)" v-if="editLevel || specLvlUp === index" slot="start" fill="clear" color="danger">
        <ion-icon color="danger" :icon="trash"></ion-icon>
      </ion-button>
      <ion-label @click="editSpec(index)">{{ item.name }}</ion-label>
      <ion-button @click="$emit('levelUp', item, -1)" v-if="editLevel || specLvlUp === index" slot="end" fill="clear" color="danger">
        <ion-icon color="danger"  :icon="remove"></ion-icon>
      </ion-button>
      <ion-label slot="end" class="lowerMargin">{{ item.value }}</ion-label>
      <ion-badge v-if="editLevel === false && specLvlUp !== index" color="danger" slot="end">{{ item.value + typeLevel }} </ion-badge>
      <ion-button v-if="editLevel || specLvlUp === index" @click="$emit('levelUp', item, 1)" class="lowerMargin rightMargin" slot="end" fill="clear" color="danger">
        <ion-icon color="danger" :icon="add"></ion-icon>
      </ion-button>
    </ion-item>
  </ion-list>

</template>

<script>
import {IonBadge, IonButton, IonIcon, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/vue";
import { add, remove, trash } from "ionicons/icons";

export default {
  name: "attributeList",
  components: {
    IonItem,
    IonLabel,
    IonList,
    IonIcon,
    IonListHeader,
    IonBadge,
    IonButton
  },
  data () {
    return {
      specLvlUp: -1
    }
  },
  props: {
    name: String,
    list: Array,
    typeLevel: Number,
    editLevel: Boolean
  },
  emits: [
      'levelUp',
      'delete'
  ],
  methods: {
    editSpec(index) {
      if (name.length !== 0) return
      if (this.specLvlUp === index) {
        this.specLvlUp = -1
        return
      }
      this.specLvlUp = index
    }
  },
  setup() {
    return {
      add,
      remove,
      trash
    };
  }
}
</script>

<style scoped>

.listHeader {
  font-size: large;
  margin-top: 2vh;
}
.headerBadge {
  position: absolute;
  right: 20px;
  font-size: large;
}

.lowerMargin {
  margin-left: 10px;
}

.rightMargin {
  margin-right: -5px;
}

</style>
