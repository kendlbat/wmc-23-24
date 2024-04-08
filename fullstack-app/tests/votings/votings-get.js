const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const {
    addVoting,
    getVoting,
    validVoting,
    anotherValidVoting,
} = require("./common");

const { addTour, validTour, anotherValidTour } = require("../tours/common");
const {
    addStation,
    validStation,
    anotherValidStation,
} = require("../stations/common");

describe("Votings - GET", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/GET votings", () => {
        it("it should initially return an empty list", async () => {
            const response = await request(server)
                .get("/api/votings")
                .expect(200)
                .expect("Content-Type", /json/);
            assert.equal(response.body.length, 0);
        });

        it("it should return a list with a single voting", async () => {
            const tourId = await addTour(request(server), validTour);
            const stationId = await addStation(request(server), validStation);

            const votingId = await addVoting(request(server), {
                ...validVoting,
                tour: tourId,
                station: stationId,
            });

            const getResponse = await request(server)
                .get("/api/votings")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 1);
            assert.equal(getResponse.body[0]._id, votingId);
        });

        it("it should list two votings", async () => {
            const tourId = await addTour(request(server), validTour);
            const anotherTourId = await addTour(
                request(server),
                anotherValidTour,
            );
            const stationId = await addStation(request(server), validStation);
            const anotherStationId = await addStation(
                request(server),
                anotherValidStation,
            );

            const votingId = await addVoting(request(server), {
                ...validVoting,
                tour: tourId,
                station: stationId,
            });

            const anotherVotingId = await addVoting(request(server), {
                ...anotherValidVoting,
                tour: anotherTourId,
                station: anotherStationId,
            });

            const getResponse = await request(server)
                .get("/api/votings")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 2);
        });
    });

    describe("/GET voting by id", () => {
        it("it should return 404 for an unknown voting", async () => {
            await request(server)
                .get("/api/votings/65326f5fec6cd87154f9db87")
                .expect(404);
        });

        it("it should return a previously inserted voting", async () => {
            const tourId = await addTour(request(server), validTour);
            const stationId = await addStation(request(server), validStation);

            const votingId = await addVoting(request(server), {
                ...validVoting,
                tour: tourId,
                station: stationId,
            });

            const getResponse = await request(server)
                .get("/api/votings/" + votingId)
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body._id, votingId);
        });
    });
});
