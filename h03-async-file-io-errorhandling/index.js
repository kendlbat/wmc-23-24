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
 * @returns {Array<SchuelerIn>}
 */
function readSchuelerInnenSync() {
    const fileContent = fs.readFileSync('data/schuelerinnen.json');
    const schuelerInnen = JSON.parse(fileContent);
    return schuelerInnen;
}

/**
 * 
 * @param {(error: string, data: Array<SchuelerIn>) => unknown} cbk 
 * @returns {void}
 */
function readSchuelerInnenAsync(cbk) {
    fs.readFile('data/schuelerinnen.json', (err, data) => {
        if (err) {
            cbk(err, null);
            return;
        }
        
        try {
            cbk(null, JSON.parse(data));
        } catch (err) {
            cbk(err, null);
        }
    });
}

/**
 * 
 * @returns {Array<Klasse>}
 */
function readKlassenSync() {
    const fileContent = fs.readFileSync('data/klassen.json');
    const klassen = JSON.parse(fileContent);
    return klassen.map(k => { return { name: k.name, raum: k.raum } });
}

/**
 * @param {(error: string, data: Array<Klasse>) => unknown} cbk
 * @returns {void}
 */
function readKlassenAsync(cbk) {
    fs.readFile('data/klassen.json', (err, data) => {
        if (err) {
            cbk(err, null);
            return;
        }

        try {
            cbk(null, JSON.parse(data));
        } catch (err) {
            cbk(err, null);
        }
    });
}

/**
 * 
 * @param {Array<SchuelerIn>} schuelerInnen 
 * @param {Array<Klasse>} klassenRaeume 
 * @param {string} searchStr 
 * @returns {Array<{ nachname: string; vorname: string; raum: string | undefined;  }>}
 */
function filterAndMergeSync(schuelerInnen, klassenRaeume, searchStr) {
    let result = schuelerInnen;
    if (searchStr) {
        if (searchStr.length() < 3)
            throw new Error('searchStr muss mindestens 3 Zeichen umfassen');

        result = schuelerInnen.filter(s => s.nachname.includes(searchStr) || s.vorname.includes(searchStr));
    }

    return result.map(s => {
        return {
            nachname: s.nachname,
            vorname: s.vorname,
            raum: klassenRaeume.find(k => k.name === s.klasse)?.raum
        }
    });
}

app.get('/api/schuelerinnen', (req, res) => {
    const searchStr = req.query.searchStr;
    let schuelerInnen, klassenRaeume;

    try {
        schuelerInnen = readSchuelerInnenSync();
    } catch (err) {
        console.error(err);
        res.status(500).send();
        return;
    }

    try {
        klassenRaeume = readKlassenSync();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
        return;
    }

    try {
        let result = filterAndMergeSync(schuelerInnen, klassenRaeume, searchStr);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
        return;
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
