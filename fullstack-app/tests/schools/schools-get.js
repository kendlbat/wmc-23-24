const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { addSchool, validSchool, anotherValidSchool } = require("./common");

describe("Schools - GET", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/GET schools", () => {
        it("it should initially return an empty list", async () => {
            const response = await request(server)
                .get("/api/schools")
                .expect(200)
                .expect("Content-Type", /json/);
            assert.equal(response.body.length, 0);
        });

        it("it should return a list with a single school", async () => {
            const schoolId = await addSchool(request(server), validSchool);

            const getResponse = await request(server)
                .get("/api/schools")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 1);
            assert.equal(getResponse.body[0]._id, schoolId);
        });

        it("it should list two schools", async () => {
            await addSchool(request(server), validSchool);
            await addSchool(request(server), anotherValidSchool);

            const getResponse = await request(server)
                .get("/api/schools")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 2);
        });
    });

    describe("/GET school by id", () => {
        it("it should return 404 for an unknown school", async () => {
            await request(server)
                .get("/api/schools/65326f5fec6cd87154f9db87")
                .expect(404);
        });

        it("it should return a previously inserted school", async () => {
            const schoolId = await addSchool(request(server), validSchool);

            const getResponse = await request(server)
                .get("/api/schools/" + schoolId)
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body._id, schoolId);
        });
    });
});
