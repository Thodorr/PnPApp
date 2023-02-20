export class Attribute {
    public name: string;
    public type: Type;
    public value: number;

    constructor(name: string, type: Type, value: number) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}

export enum Type {
    Body,
    Mind,
    Social
}
