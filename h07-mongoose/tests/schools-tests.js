const request = require("supertest");
const assert = require("assert");
const server = require("../server");

describe("Schools", () => {
    before(async () => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    let schoolId = null;

    describe("/GET schools", () => {
        it("it should GET an empty list", async () => {
            const response = await request(server)
                .get("/api/schools")
                .expect(200)
                .expect("Content-Type", /json/);
            assert.equal(response.body.length, 0);
        });
    });

    describe("/POST school", () => {
        it("it should create a new school", async () => {
            let newSchool = {
                code: 202417,
                title: "HTL Villach",
                address: {
                    zipCode: 9500,
                    city: "Villach",
                    street: "Tschinowitscherweg 5",
                },
                category: "BHS",
            };

            const response = await request(server)
                .post("/api/schools")
                .send(newSchool)
                .expect(201)
                .expect("Content-Type", /json/)
                .expect("Location", /\/api\/school\/[0-9]*/);

            assert.equal(typeof response.body, "object");
            assert.notEqual(response.body_id, "undefined");
            schoolId = response.body._id;
        });

        it("it should create another school", async () => {
            let newSchool = {
                code: 202026,
                title: "BG & BRG Villach St. Martin",
                address: {
                    zipCode: 9500,
                    city: "Villach",
                    street: "Sankt Martiner Straße 7",
                },
                category: "AHS",
            };

            const response = await request(server)
                .post("/api/schools")
                .send(newSchool)
                .expect(201)
                .expect("Content-Type", /json/);

            assert.equal(typeof response.body, "object");
            assert.notEqual(response.body_id, "undefined");
        });
    });

    describe("/GET created schools again", () => {
        it("it should GET a list with two schools", async () => {
            const response = await request(server)
                .get("/api/schools")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(typeof response.body, "object");
            assert.strictEqual(Array.isArray(response.body), true);
            assert.equal(response.body.length, 2);
        });
    });

    describe("/DELETE created school", () => {
        it("it should return 204", async () => {
            await request(server)
                .delete("/api/schools/" + schoolId)
                .expect(204);
        });
    });
});
