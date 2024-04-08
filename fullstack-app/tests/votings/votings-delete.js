const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const {
    addVoting,
    getVoting,
    validVoting,
    anotherValidVoting,
    getAllVotings,
} = require("./common");
const { addTour, validTour, anotherValidTour } = require("../tours/common");
const {
    addStation,
    validStation,
    anotherValidStation,
} = require("../stations/common");

describe("Votings - DELETE", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/DELETE votings - happy flow", () => {
        it("it should delete a single voting", async () => {
            const tourId = await addTour(request(server), validTour);
            const stationId = await addStation(request(server), validStation);
            const votingId = await addVoting(request(server), {
                ...validVoting,
                tour: tourId,
                station: stationId,
            });

            await request(server)
                .delete("/api/votings/" + votingId)
                .expect(204);

            let allVotings = await getAllVotings(request(server));

            assert.equal(allVotings.length, 0);
        });
    });

    describe("/DELETE votings - error flow", () => {
        it("it should not delete a nonexisting voting", async () => {
            const tourId = await addTour(request(server), validTour);
            const stationId = await addStation(request(server), validStation);
            const votingId = await addVoting(request(server), {
                ...validVoting,
                tour: tourId,
                station: stationId,
            });

            await request(server)
                .delete("/api/votings/" + votingId)
                .expect(204);

            await request(server)
                .delete("/api/votings/" + votingId)
                .expect(404);
        });
    });
});
