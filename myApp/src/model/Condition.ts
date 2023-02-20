import {Type} from "@/model/Attribute";

export class Condition {
    public name: string;
    public type: Type;
    public effectValue: number;

    constructor(name: string, type: Type, effectValue: number) {
        this.name = name;
        this.type = type;
        this.effectValue = effectValue;
    }
}
