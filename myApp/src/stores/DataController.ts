import {Storage} from "@ionic/storage";
import {Character} from "@/model/Character";
import {Item} from "@/model/Item";
import {Attribute} from "@/model/Attribute";

export class DataController {
    private store = new Storage();

    constructor() {
        this.store.create()
    }

    //Character Methods
    public async getCurrentCharacter(): Promise<Character> {
        const index: number = JSON.parse(await this.store.get('currentId'))
        let character: Character = JSON.parse(await this.store.get('Character' + index)) as Character;
        if (character === null) character = new Character(999,'', '', 0, '', '', 0,'','') as Character

        return character;
    }
    public async changeCurrentCharacter(index: number) {
        let character: Character = JSON.parse(await this.store.get('Character' + index)) as Character;
        await this.store.set('currentId', index)
        if (character === null) character = new Character(999,'', '', 0, '', '', 0,'','') as Character
        return character;
    }
    public async getCharacters () {
        const characterList: Character[] = [];
        const keys = await this.store.keys();
        for (const i in keys) {
            if (keys[i].includes('Character')) {
                const value = await this.store.get(keys[i]);
                characterList[i] = JSON.parse(value);
            }
        }
        return characterList;
    }
    public async addCharacter () {
        const slot: number = await this.getFreeSlot();
        const character: Character = new Character(slot, '', '', 0, '', '', 0, '',
            'https://cdn.pixabay.com/photo/2014/06/24/17/34/silhouette-376538_960_720.jpg');
        return character;
    }
    public async saveCharacter(character: Character) {
        await this.store.set('Character' + character.id, JSON.stringify(character))
    }
    public async removeCharacter() {
        const index: number = JSON.parse(await this.store.get('currentId'))
        await this.store.remove('Character' + index)
    }
    private async getFreeSlot () {
        const characters: Character[] = await this.getCharacters();
        if (characters.length === 0 ) return 0;
        for (const i in characters) {
            if (characters[i].id !== Number(i) ) {
                return Number(i);
            }
        }
        return characters.length
    }


    // Attribute Methods
    public async createAttribute(attribute: Attribute) {
        const character: Character = await this.getCurrentCharacter();
        if (character.attributes === undefined) character.attributes = [];
        const amount = attribute.value;
        attribute.value = 0;
        return await this.levelUp(attribute, amount);
    }
    public async levelUp(attribute: Attribute, amount: number) {
        const threshHolds: number[] = [50, 100, 120, 200];
        let multiplier= 1;

        const character: Character = await this.getCurrentCharacter();
        const index = character.attributes.findIndex((attr: any) => attr.name === attribute.name);
        if (index === -1) character.attributes.push(attribute)
        else attribute = character.attributes[index]
        let removeAmount = 0;

        for (const i in threshHolds) {
            if (attribute.value < threshHolds[i]) {
                const distance = threshHolds[i] - attribute.value;

                if (amount <= distance) {
                    removeAmount += amount * multiplier;
                    attribute.value += amount;
                    break;
                } else {
                    amount -= distance
                    removeAmount += distance * multiplier;
                    attribute.value += distance;
                }
            }
            multiplier++;
        }
        if (removeAmount > character.attributePoints) {
            attribute.value -= amount;
            return null;
        } else {
            character.attributePoints -= removeAmount;
            character.usedPoints += removeAmount;
        }
        await this.saveCharacter(character);
        return character
    }
    public async deleteAttribute(attribute: Attribute) {
        const threshHolds = [200, 120, 100, 50, 0];
        let multiplier = threshHolds.length;

        let amount = attribute.value;
        let regainAmount = 0;

        for (const i in threshHolds) {
            if (attribute.value > threshHolds[i]) {
                const distance = threshHolds[i] - attribute.value;

                if (amount <= distance) {
                    regainAmount += amount * multiplier;
                    attribute.value += amount;
                    break;
                } else {
                    amount -= distance
                    regainAmount += distance * multiplier;
                    attribute.value += distance;
                }
            }
            multiplier--;
        }

        const character: Character = await this.getCurrentCharacter();

        character.attributePoints -= regainAmount;
        character.usedPoints += regainAmount;

        const index = character.attributes.findIndex((attr: any) => attr.name === attribute.name);
        character.attributes.splice(index, 1);

        await this.saveCharacter(character);
        return character
    }
    public async changeAttributePoints(amount: number) {
        const character: Character = await this.getCurrentCharacter();
        character.attributePoints = amount;
        return character.attributePoints;
    }

    // Item Methods
    public async getItems(): Promise<Item[]> {
        const character: Character = await this.getCurrentCharacter();
        if (character.items === undefined) character.items = [];
        return character.items as Item[]
    }
    public async addItem(item: Item): Promise<Item[]> {
        const character = await this.getCurrentCharacter();
        const index = character.items.findIndex((item1: any) => item1.name === item.name);
        if (index === -1) {
            character.items.push(item)
        } else {
            const foundItem = character.items[index];
            foundItem.value += item.value;
        }
        await this.saveCharacter(character);
        return character.items as Item[]
    }
    public async removeItem(item: Item): Promise<Item[]> {
        const character = await this.getCurrentCharacter();
        const index = character.items.findIndex((item1: any) => item1.name === item.name);
        character.items.splice(index, 1);
        await this.saveCharacter(character);
        return character.items as Item[]
    }
}
