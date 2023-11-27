const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validStation, getStation } = require("./common");

describe("Stations - POST", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/POST stations - happy flow", () => {
        it("it should add a single station", async () => {
            const postResponse = await request(server)
                .post("/api/stations")
                .send(validStation)
                .expect(201)
                .expect("Content-Type", /json/);

            const stationId = postResponse.body._id;

            assert.equal(typeof postResponse.body, "object");
            assert.notEqual(stationId, undefined);
            assert.equal(
                postResponse.headers.location,
                `/api/stations/${stationId}`
            );

            const station = await getStation(request(server), stationId);

            assert.equal(station._id, stationId);
        });

        it("it should not a station with invalid roomNumber", async () => {
            let invalidStation = { ...validStation, roomNumber: "77777" };

            await request(server)
                .post("/api/stations")
                .send(invalidStation)
                .expect(400);

            const getResponse = await request(server)
                .get("/api/stations")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 0);
        });
    });
});
