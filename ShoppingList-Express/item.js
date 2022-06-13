const items = require("./fakeDb");

class Item {
    constructor (name, price) {
        this.name = name;
        this.price = price;

        items.push(this);
    }
    static findAll() {
        return items
    }

    static Update(name, price) {
        let foundItem = Item.find(name);
        /**if we do not find the item w matching data */
        if (foundItem === undefined) {
            throw {message: "Not Found", status: 404}

        
        }
        foundItem.name = data.name;
        foundItem.price = data.price;
        
        return foundItem;
    }

    static find(name) {
        let foundIdx = item.findIndex(v => v.name ===name);
        if (foundIdx === -1) {
            throw {message: "NOT FOUND", status: 404}

        }
        items.splice(foundIdx, 1);
    }
}

module.exports = Item;