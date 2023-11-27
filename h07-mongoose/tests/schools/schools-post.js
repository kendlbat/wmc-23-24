const request = require("supertest");
const assert = require("assert");
const server = require("../../server");
const { validSchool, getSchool } = require("./common");

describe("Schools - POST", () => {
    before((done) => {
        // wait for 1000 msecs to start the backend and connect to DB
        // will be replaced with something smarter in the future
        setTimeout(done, 1000);
    });

    beforeEach(async () => {
        await server.dropCurrentDatabase();
    });

    describe("/POST schools - happy flow", () => {
        it("it should add a single school", async () => {
            const postResponse = await request(server)
                .post("/api/schools")
                .send(validSchool)
                .expect(201)
                .expect("Content-Type", /json/);

            const schoolId = postResponse.body._id;

            assert.equal(typeof postResponse.body, "object");
            assert.notEqual(schoolId, undefined);
            assert.equal(
                postResponse.headers.location,
                `/api/schools/${schoolId}`
            );

            const school = await getSchool(request(server), schoolId);

            assert.equal(school._id, schoolId);
        });

        it("it should not a school with invalid category", async () => {
            let invalidSchool = { ...validSchool, category: "GERD" };

            await request(server)
                .post("/api/schools")
                .send(invalidSchool)
                .expect(400);

            const getResponse = await request(server)
                .get("/api/schools")
                .expect(200)
                .expect("Content-Type", /json/);

            assert.equal(getResponse.body.length, 0);
        });
    });
});
