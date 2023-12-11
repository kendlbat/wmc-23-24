const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validTour, getTour } = require("./common");
const { validStation } = require("../stations/common");

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

        it("it should not add a tour with invalid guideClassName", async () => {
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

        it("add a single tour with favoriteStation", async () => {
            const stationId = await request(server)
                .post("/api/stations")
                .send(validStation)
                .expect(201)
                .then((res) => {
                    // Get location from header
                    const location = res.headers.location;
                    return location.substring(location.lastIndexOf("/") + 1);
                });

            const postResponse = await request(server)
                .post("/api/tours")
                .send({
                    ...validTour,
                    favoriteStation: stationId,
                })
                .expect(201)
                .expect("Content-Type", /json/);

            const tourId = postResponse.body._id;

            assert.equal(typeof postResponse.body, "object");
            assert.notEqual(tourId, undefined);
            assert.equal(postResponse.headers.location, `/api/tours/${tourId}`);

            const tour = await getTour(request(server), tourId);

            assert.equal(tour._id, tourId);
        });

        it("it should not add a tour with invalid favoriteStation", async () => {
            await request(server)
                .post("/api/tours")
                .send({
                    ...validTour,
                    favoriteStation:
                        "53616c7465645f5f89ace4c3f8149a259a0c095dc0895608c2abb62a8ca2df7d5eae4d749879aabdcdf359512b06013c993793845f4e0541ee284726af3b7e93",
                })
                .expect(400);

            const getResponse = await request(server)
                .get("/api/tours")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 0);
        });
    });
});
