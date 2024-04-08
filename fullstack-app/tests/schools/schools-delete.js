const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validSchool, addSchool, getAllSchools } = require("./common");

describe("Schools - DELETE", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/DELETE schools - happy flow", () => {
        it("it should delete a single school", async () => {
            const schoolId = await addSchool(request(server), validSchool);

            await request(server)
                .delete("/api/schools/" + schoolId)
                .expect(204);

            let allSchools = await getAllSchools(request(server));

            assert.equal(allSchools.length, 0);
        });
    });

    describe("/DELETE schools - error flow", () => {
        it("it should not delete a nonexisting school", async () => {
            const schoolId = await addSchool(request(server), validSchool);

            await request(server)
                .delete("/api/schools/" + schoolId)
                .expect(204);

            await request(server)
                .delete("/api/schools/" + schoolId)
                .expect(404);
        });
    });
});
