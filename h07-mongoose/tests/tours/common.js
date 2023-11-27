const assert = require("assert");

const validTour = {
    guideName: "John Doe",
    guideClass: "4BHIF",
    numPersons: 4,
    registration: false,
};

const anotherValidTour = {
    guideName: "Jane Doe",
    guideClass: "5AHIF",
    numPersons: 3,
    registration: true,
};

async function addTour(r, tour) {
    const response = await r
        .post("/api/tours")
        .send(tour)
        .expect(201)
        .expect("Content-Type", /json/);

    const tourId = response.body._id;

    assert.equal(typeof response.body, "object");
    assert.notEqual(tourId, undefined);
    assert.equal(response.headers.location, `/api/tours/${tourId}`);

    return tourId;
}

async function getTour(r, tourId) {
    const response = await r
        .get("/api/tours/" + tourId)
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");
    assert.equal(response.body._id, tourId);

    return response.body;
}

async function getAllTours(r) {
    const response = await r
        .get("/api/tours")
        .expect(200)
        .expect("Content-Type", /json/);

    assert.equal(typeof response.body, "object");

    return response.body;
}

module.exports = { validTour, anotherValidTour, addTour, getTour, getAllTours };
