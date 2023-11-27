const assert = require("assert");

const validStation = {
    title: "Smart Home",
    subtitle: "4BHIF",
    roomNumber: 142,
    interactive: true,
};

const anotherValidStation = {
    title: "Videowand",
    subtitle: "4BHIF",
    roomNumber: 100,
    interactive: false,
};

async function addStation(r, station) {
    const response = await r
        .post("/api/stations")
        .send(station)
        .expect(201)
        .expect("Content-Type", /json/);

    const stationId = response.body._id;

    assert.equal(typeof response.body, "object");
    assert.notEqual(stationId, undefined);
    assert.equal(response.headers.location, `/api/stations/${stationId}`);

    return stationId;
}

async function getStation(r, stationId) {
    const response = await r
        .get("/api/stations/" + stationId)
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");
    assert.equal(response.body._id, stationId);

    return response.body;
}

async function getAllStations(r) {
    const response = await r
        .get("/api/stations")
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");

    return response.body;
}

module.exports = {
    validStation,
    anotherValidStation,
    addStation,
    getStation,
    getAllStations,
};
