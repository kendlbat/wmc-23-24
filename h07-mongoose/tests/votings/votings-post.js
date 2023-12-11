const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validTour, addTour } = require("../tours/common");
const { validStation, addStation } = require("../stations/common");
const { validVoting, getVoting } = require("./common");

describe("Votings - POST", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/POST votings - happy flow", () => {
        it("it should add a single voting", async () => {
            const tourId = await addTour(request(server), validTour);
            const stationId = await addStation(request(server), validStation);

            const postResponse = await request(server)
                .post("/api/votings")
                .send({
                    ...validVoting,
                    tour: tourId,
                    station: stationId,
                })
                .expect(201)
                .expect("Content-Type", /json/);

            const votingId = postResponse.body._id;

            assert.equal(typeof postResponse.body, "object");
            assert.notEqual(votingId, undefined);
            assert.equal(
                postResponse.headers.location,
                `/api/votings/${votingId}`
            );

            const voting = await getVoting(request(server), votingId);

            assert.equal(voting._id, votingId);
        });

        it("it should not add a voting with invalid numStars", async () => {
            const tourId = await addTour(request(server), validTour);
            const stationId = await addStation(request(server), validStation);
            let invalidVoting = {
                numStars: 17,
                tour: tourId,
                station: stationId,
            };

            await request(server)
                .post("/api/votings")
                .send(invalidVoting)
                .expect(400);

            const getResponse = await request(server)
                .get("/api/votings")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 0);
        });

        it("it should not add a voting with invalid station", async () => {
            const tourId = await addTour(request(server), validTour);
            await request(server)
                .post("/api/votings")
                .send({
                    ...validVoting,
                    tour: tourId,
                    station:
                        "53616c7465645f5f89ace4c3f8149a259a0c095dc0895608c2abb62a8ca2df7d5eae4d749879aabdcdf359512b06013c993793845f4e0541ee284726af3b7e93",
                })
                .expect(400);

            const getResponse = await request(server)
                .get("/api/votings")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 0);
        });
    });
});
