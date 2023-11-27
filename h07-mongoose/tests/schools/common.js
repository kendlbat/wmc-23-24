const assert = require("assert");

const validSchool = {
    code: 202026,
    title: "BG & BRG Villach St. Martin",
    address: {
        zipCode: 9500,
        city: "Villach",
        street: "Sankt Martiner Straße 7",
    },
    category: "AHS",
};

const anotherValidSchool = {
    code: 202417,
    title: "HTL Villach",
    address: {
        zipCode: 9500,
        city: "Villach",
        street: "Tschinowitscherweg 5",
    },
    category: "BHS",
};

async function addSchool(r, school) {
    const response = await r
        .post("/api/schools")
        .send(school)
        .expect(201)
        .expect("Content-Type", /json/);

    const schoolId = response.body._id;

    assert.equal(typeof response.body, "object");
    assert.notEqual(schoolId, undefined);
    assert.equal(response.headers.location, `/api/schools/${schoolId}`);

    return schoolId;
}

async function getSchool(r, schoolId) {
    const response = await r
        .get("/api/schools/" + schoolId)
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");
    assert.equal(response.body._id, schoolId);

    return response.body;
}

async function getAllSchools(r) {
    const response = await r
        .get("/api/schools")
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");

    return response.body;
}

module.exports = {
    validSchool,
    anotherValidSchool,
    addSchool,
    getSchool,
    getAllSchools,
};
