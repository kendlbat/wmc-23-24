const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validTour, getTour } = require("./common");

describe("Tours - POST", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/POST tours - happy flow", () => {
        it("it should add a single tour", async () => {
            const postResponse = await request(server)
                .post("/api/tours")
                .send(validTour)
                .expect(201)
                .expect("Content-Type", /json/);

            const tourId = postResponse.body._id;

            assert.equal(typeof postResponse.body, "object");
            assert.notEqual(tourId, undefined);
            assert.equal(postResponse.headers.location, `/api/tours/${tourId}`);

            const tour = await getTour(request(server), tourId);

            assert.equal(tour._id, tourId);
        });

        it("it should not a tour with invalid guideClassName", async () => {
            let invalidTour = { ...validTour, guideClass: "4CHIF" };

            await request(server)
                .post("/api/tours")
                .send(invalidTour)
                .expect(400);

            const getResponse = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 0);
        });
    });
});
