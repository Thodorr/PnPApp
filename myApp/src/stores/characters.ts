import { defineStore } from "pinia";
import {Character} from "@/model/Character";
import { Storage } from "@ionic/storage";

export const useCharacterStore = defineStore('characters', {
    state: () => {
        return {
            store: new Storage(),
            characters: new Array<Character>
        }
    },
    actions: {
        async addCharacter(character: Character) {
            this.characters.push(character);
            window.localStorage.setItem(character.name, JSON.stringify(character))
        }
    }
})
