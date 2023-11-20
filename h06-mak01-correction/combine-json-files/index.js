const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

function readSchuelerSync(filename) {
    return readJSONSync("data/" + filename + ".json", [
        "id",
        "nachname",
        "vorname",
        "klasse",
    ]);
}

function readKlassenSync() {
    const klassen = readJSONSync("data/klassen.json", ["name", "raum"]);
    return klassen.filter((k) => k.name.endsWith("HIF"));
}

function readJSONSync(fileName, propNames) {
    const fileContent = fs.readFileSync(fileName);
    const parsedFileContent = JSON.parse(fileContent);

    const mappedFileContent = parsedFileContent.map((s) => {
        let projS = {};
        // iterate over every selected property
        for (let key of propNames) {
            if (!(key in s)) throw new Error(`property ${key} not existing`);
            projS[key] = s[key];
        }
        return projS;
    });

    return mappedFileContent;
}

/**
 *
 * @param {string} fileName
 * @param {Array<string>} propNames
 * @param {(err: Error | undefined, data: any) => } cbk
 */
function readJSONAsync(fileName, propNames, cbk) {
    fs.readFile(fileName, (err, data) => {
        if (err) return cbk(err);
        let parsed, mapped;
        try {
            parsed = JSON.parse(data);
            mapped = parsed.map((s) => {
                let projS = {};

                for (let key of propNames) {
                    if (!(key in s))
                        throw new Error(`property ${key} not existing`);
                    projS[key] = s[key];
                }
                return projS;
            });
            cbk(undefined, mapped);
        } catch (err) {
            cbk(err);
        }
    });
}

function readSchuelerAsync(filename, cbk) {
    // return readJSONSync('data/' + filename + '.json',
    //     ['id', 'nachname', 'vorname', 'klasse']);

    readJSONAsync(
        "data/" + filename + ".json",
        ["id", "nachname", "vorname", "klasse"],
        (err, data) => {
            cbk(err, data);
        },
    );
}

function readKlassenAsync(cbk) {
    // const klassen = readJSONSync('data/klassen.json', ['name', 'raum']);
    // return klassen.filter(k => k.name.endsWith('HIF'));

    readJSONAsync("data/klassen.json", ["name", "raum"], (err, data) => {
        if (err) return cbk(err);

        try {
            cbk(
                undefined,
                data.filter((k) => k.name.endsWith("HIF")),
            );
        } catch (err) {
            cbk(err);
        }
    });
}

app.get("/api/schueler/:name", (req, res) => {
    let schueler, klassen;
    let responded = false;

    const sendErr = (err) => {
        if (responded) return;
        responded = true;

        console.error(err);
        res.status(500).send(err.message ? err.message : "unknown error");
    };

    readSchuelerAsync(req.params.name, (err, data) => {
        if (err) return sendErr(err);

        schueler = data;

        readKlassenAsync((err, data) => {
            if (err) return sendErr(err);

            klassen = data;

            if (responded) return;
            if (!schueler || !klassen) return;

            try {
                let result = schueler.map((s) => {
                    return {
                        nachname: s.nachname,
                        vorname: s.vorname,
                        raum: klassen.find((k) => k.name === s.klasse).raum,
                    };
                });

                res.status(200).json(result);
            } catch (err) {
                sendErr(err);
            }
        });
    });
});

app.get("/api/schuelerP/:name", (req, res) => {
    let schueler, klassen;
    let responded = false;

    const finishRequest = () => {
        if (responded) return;
        if (!schueler || !klassen) return;

        try {
            let result = schueler.map((s) => {
                return {
                    nachname: s.nachname,
                    vorname: s.vorname,
                    raum: klassen.find((k) => k.name === s.klasse).raum,
                };
            });

            res.status(200).json(result);
        } catch (err) {
            sendErr(err);
        }
    };

    const sendErr = (err) => {
        if (responded) return;
        responded = true;

        console.error(err);
        res.status(500).send(err.message ? err.message : "unknown error");
    };

    readSchuelerAsync(req.params.name, (err, data) => {
        if (err) return sendErr(err);

        schueler = data;
        finishRequest();
    });

    readKlassenAsync((err, data) => {
        if (err) return sendErr(err);

        klassen = data;
        finishRequest();
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
