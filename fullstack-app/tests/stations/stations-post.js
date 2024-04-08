const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const {
    validStation,
    addStation,
    getStation,
    getAllStations,
} = require("./common");
const { getAll } = require("../../tours/tours-handlers");

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
                `/api/stations/${stationId}`,
            );

            const station = await getStation(request(server), stationId);

            assert.equal(station._id, stationId);
        });
    });

    describe("/POST stations - error flows", () => {
        it("it should not add a station with invalid roomNumber", async () => {
            let invalidStation = { ...validStation, roomNumber: 401 };

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

        it("it should not add more then three stations with same roomNumber", async () => {
            let stationA = { ...validStation, title: "A" };
            let stationB = { ...validStation, title: "B" };
            let stationC = { ...validStation, title: "C" };

            await addStation(request(server), stationA);
            await addStation(request(server), stationB);
            await addStation(request(server), stationC);

            let stationFailing = { ...validStation, title: "A" };

            await request(server)
                .post("/api/stations")
                .send(stationFailing)
                .expect(400);

            let allStations = await getAllStations(request(server));
            assert.equal(allStations.length, 3);
        });

        it("it should not add more then five stations with same title", async () => {
            for (let idx = 1; idx <= 5; idx++) {
                let stationI = {
                    ...validStation,
                    title: "Title",
                    subtitle: "Sub" + idx,
                    roomNumber: idx,
                };
                await addStation(request(server), stationI);
            }

            let stationFailing = {
                ...validStation,
                title: "Title",
                subtitle: "Too much",
            };

            await request(server)
                .post("/api/stations")
                .send(stationFailing)
                .expect(400);

            let allStations = await getAllStations(request(server));
            assert.equal(allStations.length, 5);
        });
    });
});
