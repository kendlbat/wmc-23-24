const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

/**
 * @typedef {Object} SchuelerIn
 * @property {string} nachname
 * @property {string} vorname
 * @property {string} klasse
 * @property {number} id
 */

/**
 * @typedef {Object} Klasse
 * @property {string} name
 * @property {string} jahrgangsVorstand
 * @property {string} raum
 */

/**
 *
 * @returns {Promise<Array<SchuelerIn>>}
 */
function readSchuelerInnenSync() {
    return fs.promises
        .readFile("data/schuelerinnen.json")
        .then((data) => JSON.parse(data));
}

/**
 *
 * @returns {Promise<Array<Klasse>>}
 */
function readKlassenSync() {
    return fs.promises
        .readFile("data/klassen.json")
        .then((data) => JSON.parse(data))
        .then((klassen) =>
            klassen.map((k) => {
                return { name: k.name, raum: k.raum };
            }),
        );
}

function filterAndMergeSync(schuelerInnen, klassenRaeume, searchStr) {
    return new Promise((resolve, reject) => {
        if (searchStr) {
            if (searchStr.length < 3)
                return reject(
                    new Error("searchStr muss mindestens 3 Zeichen umfassen"),
                );

            return resolve(
                schuelerInnen.filter(
                    (s) =>
                        s.nachname.includes(searchStr) ||
                        s.vorname.includes(searchStr),
                ),
            );
        }

        resolve(schuelerInnen);
    }).then((result) =>
        result.map((s) => {
            return {
                nachname: s.nachname,
                vorname: s.vorname,
                raum: klassenRaeume.find((k) => k.name === s.klasse).raum,
            };
        }),
    );
}

app.get("/api/schuelerinnen", async (req, res) => {
    const searchStr = req.query.searchStr;

    let schuelerInnen, klassenRaeume;

    try {
        schuelerInnen = await readSchuelerInnenSync();
        klassenRaeume = await readKlassenSync();
        res.json(
            await filterAndMergeSync(schuelerInnen, klassenRaeume, searchStr),
        );
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

app.get("/api/schuelerinnenP", async (req, res) => {
    const searchStr = req.query.searchStr;

    // Execute 2 async functions parallel, no Promise.all
    let schuelerInnen, klassenRaeume;

    /**
     * @param {Array<Promise<any>>} promises
     * @returns {Promise<Array<any>>}
     */
    const execParallel = async (promises) => {
        const finishFunction = () => {
            finished++;
            if (finished !== promises.length) return;

            if (errors.some((e) => e !== undefined))
                return reject(errors.find((e) => e !== undefined));

            resolve(results);
        };

        let finished = 0;
        let results = [];
        let errors = [];

        for (let i = 0; i < promises.length; i++) {
            results[i] = undefined;
            errors[i] = undefined;
        }

        promises.forEach((p, i) => {
            p.then((result) => {
                results[i] = result;
                finishFunction();
            }).catch((err) => {
                errors[i] = err;
                finishFunction();
            });
        });
    };

    // Old version
    try {
        let results = await execParallel([
            readSchuelerInnenSync(),
            readKlassenSync(),
        ]);
        schuelerInnen = results[0];
        klassenRaeume = results[1];

        res.json(
            await filterAndMergeSync(schuelerInnen, klassenRaeume, searchStr),
        );
    } catch (e) {
        console.error(e);
        res.status(500).send();
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
