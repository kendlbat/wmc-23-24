const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validStation, addStation, getAllStations } = require("./common");

describe("Stations - DELETE", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/DELETE stations - happy flow", () => {
        it("it should delete a single station", async () => {
            const stationId = await addStation(request(server), validStation);

            await request(server)
                .delete("/api/stations/" + stationId)
                .expect(204);

            let allStations = await getAllStations(request(server));

            assert.equal(allStations.length, 0);
        });
    });

    describe("/DELETE stations - error flow", () => {
        it("it should not delete a nonexisting station", async () => {
            const stationId = await addStation(request(server), validStation);

            await request(server)
                .delete("/api/stations/" + stationId)
                .expect(204);

            await request(server)
                .delete("/api/stations/" + stationId)
                .expect(404);
        });
    });
});
