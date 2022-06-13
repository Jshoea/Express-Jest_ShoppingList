process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../shop_app");
let items = require("../fakeDB")
let item = {name: "food", price:100}

beforeEach( async() => {
    item.push(item)
});
afterEach( async() => {
    item = []
});

describe("GET /items", async function() {
    test("Get the created list of items", async function() {
        const response = await request(app).get(`/items`);
        const {items} = response.body;
        expect (response.statusCode).toBe(200);
        expect (items).toHaveLength(1);
    });
});

//getting data for one selected item
describe ("GET /items/:name", async function () {
    test("Return a single requested item", async function() {
        const response = await request (app).get(`/items/${items.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });
    test("Return 404 when Item cannot be found", async function() {
        const response = await request(app).get(`/items/0`);
        expect(response.statusCode).toBe(404);
    });
});

//test the creation of item
describe("POST /items", async function() {
    test("Crate a new Item", async function() {
        const response = await (await request(app).post(`/items`))
        .send({
            name: "pizza",
            price: 250
        });
        expect (response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty("name");
        expect(response.body.item).toHaveProperty("price");
        expect(response.body.item.name).toEqual("pizza");
        expect(response.body.item.price).toEqual(250);
    });
});


//patch or update item
describe("PATCH /items/:name", async function() {
    test ("PATCH existing item", async function() {
        const response = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "poop"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual({
            name: "poop"
        });
    });
    test("Respond with 404 if cannot return", async function() {
        const response = await request(app).patch(`/item/0`);
        expect(response.statusCode).toBe(404);
    });
});


//test deletion of itme

describe("DELETE /items/:name", async function () {
    test("Delete an item", async function () {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Deleted"});
    });
});
