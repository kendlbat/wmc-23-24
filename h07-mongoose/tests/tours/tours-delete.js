const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validTour, addTour, getAllTours } = require("./common");

describe("Tours - DELETE", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/DELETE tours - happy flow", () => {
        it("it should delete a single tour", async () => {
            const tourId = await addTour(request(server), validTour);

            await request(server)
                .delete("/api/tours/" + tourId)
                .expect(204);

            let allTours = await getAllTours(request(server));

            assert.equal(allTours.length, 0);
        });
    });

    describe("/DELETE tours - error flow", () => {
        it("it should not delete a nonexisting tour", async () => {
            const tourId = await addTour(request(server), validTour);

            await request(server)
                .delete("/api/tours/" + tourId)
                .expect(204);

            await request(server)
                .delete("/api/tours/" + tourId)
                .expect(404);
        });
    });
});
