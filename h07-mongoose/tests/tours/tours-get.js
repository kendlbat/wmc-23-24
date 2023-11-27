const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { addTour, validTour, anotherValidTour } = require("./common");

describe("Tours - GET", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/GET tours", () => {
        it("it should initially return an empty list", async () => {
            const response = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);
            assert.equal(response.body.length, 0);
        });

        it("it should return a list with a single tour", async () => {
            const tourId = await addTour(request(server), validTour);

            const getResponse = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 1);
            assert.equal(getResponse.body[0]._id, tourId);
        });

        it("it should list two tours", async () => {
            await addTour(request(server), validTour);
            await addTour(request(server), anotherValidTour);

            const getResponse = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 2);
        });
    });

    describe("/GET tour by id", () => {
        it("it should return 404 for an unknown tour", async () => {
            await request(server)
                .get("/api/tours/65326f5fec6cd87154f9db87")
                .expect(404);
        });

        it("it should return a previously inserted tour", async () => {
            const tourId = await addTour(request(server), validTour);

            const getResponse = await request(server)
                .get("/api/tours/" + tourId)
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body._id, tourId);
        });
    });
});
