export class Enum {
    constructor (name, value, text) {
        this.name = name;
        this.value = value;
        this.text = text;
    }
}

export class EnumsSet {
    constructor (name, enums) {
        this.name = name;
        this.set = {};
        _.each(enums, (i) => {
            this.set[i.value] = i;
        });
    }

    getText (value, defaultValue) {
        const item = this.set[value];
        return item != null ? item.text : (defaultValue == null ? value : defaultValue);
    }
}
