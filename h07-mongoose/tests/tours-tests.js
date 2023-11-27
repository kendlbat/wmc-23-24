const request = require("supertest");
const assert = require("assert");
const server = require("../server");

describe("Tours", () => {
    before(async () => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    let tourId = null;

    describe("/GET tours", () => {
        it("it should GET an empty list", async () => {
            const response = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);
            assert.equal(response.body.length, 0);
        });
    });

    describe("/POST tour", () => {
        it("it should create a new tour", async () => {
            let newTour = {
                guideName: "John Doe",
                guideClass: "4BHIF",
                numPersons: 4,
                registration: false,
            };

            const response = await request(server)
                .post("/api/tours")
                .send(newTour)
                .expect(201)
                .expect("Content-Type", /json/);

            assert.equal(typeof response.body, "object");
            assert.notEqual(response.body_id, "undefined");
            tourId = response.body._id;
        });

        it("it should create another tour", async () => {
            let newTour = {
                guideName: "Jane Doe",
                guideClass: "5AHIF",
                numPersons: 3,
                registration: false,
            };

            const response = await request(server)
                .post("/api/tours")
                .send(newTour)
                .expect(201)
                .expect("Content-Type", /json/)
                .expect("Location", /\/api\/tours\/[0-9]*/);

            assert.equal(typeof response.body, "object");
            assert.notEqual(response.body_id, "undefined");
        });
    });

    describe("/GET created tours again", () => {
        it("it should GET a list with two tours", async () => {
            const response = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(typeof response.body, "object");
            assert.strictEqual(Array.isArray(response.body), true);
            assert.equal(response.body.length, 2);
        });
    });

    describe("/DELETE created tour", () => {
        it("it should return 204", async () => {
            await request(server)
                .delete("/api/tours/" + tourId)
                .expect(204);
        });
    });
});
