const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { addStation, validStation, anotherValidStation } = require("./common");

describe("Stations - GET", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/GET stations", () => {
        it("it should initially return an empty list", async () => {
            const response = await request(server)
                .get("/api/stations")
                .expect(200)
                .expect("Content-Type", /json/);
            assert.equal(response.body.length, 0);
        });

        it("it should return a list with a single station", async () => {
            const stationId = await addStation(request(server), validStation);

            const getResponse = await request(server)
                .get("/api/stations")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 1);
            assert.equal(getResponse.body[0]._id, stationId);
        });

        it("it should list two stations", async () => {
            await addStation(request(server), validStation);
            await addStation(request(server), anotherValidStation);

            const getResponse = await request(server)
                .get("/api/stations")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 2);
        });
    });

    describe("/GET station by id", () => {
        it("it should return 404 for an unknown station", async () => {
            await request(server)
                .get("/api/stations/65326f5fec6cd87154f9db87")
                .expect(404);
        });

        it("it should return a previously inserted station", async () => {
            const stationId = await addStation(request(server), validStation);

            const getResponse = await request(server)
                .get("/api/stations/" + stationId)
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body._id, stationId);
        });
    });
});
