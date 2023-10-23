const express = require('express');
const fs = require('fs');
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
    return fs.promises.readFile('data/schuelerinnen.json')
        .then((data) => JSON.parse(data));
}

/**
 * 
 * @returns {Promise<Array<Klasse>>}
 */
function readKlassenSync() {
    return fs.promises.readFile('data/klassen.json')
        .then((data) => JSON.parse(data))
        .then((klassen) => klassen.map(k => { return { name: k.name, raum: k.raum }; }));
}

function filterAndMergeSync(schuelerInnen, klassenRaeume, searchStr) {
    return new Promise((resolve, reject) => {
        if (searchStr) {
            if (searchStr.length < 3)
                return reject(new Error('searchStr muss mindestens 3 Zeichen umfassen'));

            return resolve(schuelerInnen.filter(s => s.nachname.includes(searchStr) || s.vorname.includes(searchStr)));
        }

        resolve(schuelerInnen);
    }).then((result) => result.map(s => {
        return {
            nachname: s.nachname,
            vorname: s.vorname,
            raum: klassenRaeume.find(k => k.name === s.klasse).raum
        }
    }));
}

app.get('/api/schuelerinnen', (req, res) => {
    const searchStr = req.query.searchStr;

    let schuelerInnen, klassenRaeume;

    // Note: this was implemented _after_ schuelerinnenP, it is in fact harder to keep sync than promisified

    readSchuelerInnenSync()
        .then((result) => {
            schuelerInnen = result;
            return readKlassenSync();
        })
        .then((result) => {
            klassenRaeume = result;
            return { schuelerInnen, klassenRaeume };
        })
        .then((data) => filterAndMergeSync(data.schuelerInnen, data.klassenRaeume, searchStr))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });

});

app.get('/api/schuelerinnenP', (req, res) => {
    const searchStr = req.query.searchStr;

    Promise.all([readSchuelerInnenSync(), readKlassenSync()])
        .then((results) => { return { schuelerInnen: results[0], klassenRaeume: results[1] }; })
        .then((data) => filterAndMergeSync(data.schuelerInnen, data.klassenRaeume, searchStr))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
});

app.get('/api/schuelerinnenPAll', (req, res) => {
    // Hehe
    res.redirect("/api/schuelerinnenP");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
