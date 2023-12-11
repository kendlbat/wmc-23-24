const assert = require("assert");

const validVoting = {
    numStars: 5,
};

const anotherValidVoting = {
    numStars: 4,
};

async function addVoting(r, voting) {
    const response = await r
        .post("/api/votings")
        .send(voting)
        .expect(201)
        .expect("Content-Type", /json/);

    const votingId = response.body._id;

    assert.equal(typeof response.body, "object");
    assert.notEqual(votingId, undefined);
    assert.equal(response.headers.location, `/api/votings/${votingId}`);

    return votingId;
}

async function getVoting(r, votingId) {
    const response = await r
        .get("/api/votings/" + votingId)
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");
    assert.equal(response.body._id, votingId);

    return response.body;
}

async function getAllVotings(r) {
    const response = await r
        .get("/api/votings")
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");

    return response.body;
}

module.exports = {
    validVoting,
    anotherValidVoting,
    addVoting,
    getVoting,
    getAllVotings,
};
