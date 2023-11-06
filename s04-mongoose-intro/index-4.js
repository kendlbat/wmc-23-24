const mongoose = require("mongoose");

const { Schema } = mongoose;

const dbConnectTimeout = 5000;

let teachersData = [
    {
        shortcut: "KAA",
        lastname: "Karasek",
        numberOfSubjects: 3,
    },
    {
        shortcut: "KON",
        lastname: "Kofler",
        numberOfSubjects: 5,
    },
    {
        lastname: "Linder",
        numberOfSubjects: 1,
    },
];

// Schema - w/out validation
const teacherSchema = new Schema({
    shortcut: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 3,
    },
    lastname: {
        type: String,
        required: true,
    },
    numberOfSubjects: Number,
});

// Model
const Teacher = mongoose.model("teachers", teacherSchema);

/**
 *
 * @param {string} connectionString
 * @param {mongoose.ConnectOptions | undefined} options
 */
async function dbConnect(connectionString, options) {
    await mongoose.connect(connectionString, options);
}

async function dbDisconnect() {
    await mongoose.disconnect();
}

async function main() {
    try {
        await dbConnect(
            "mongodb://root:root@localhost:50000/mongoose-intro-db",
            {
                authSource: "admin",
                user: "root",
                pass: "root",
            }
        );
        console.log("connected to database");

        try {
            const resp = await Teacher.insertMany(teachersData, {
                ordered: false, // Async -> otherwise fails if one fails
            });

            console.log(
                `Successfully inserted ${resp.length}/${teachersData.length} records`
            );
        } catch (e) {
            console.error(e);
        }
    } catch (e) {
        console.error(`error connecting to database: ${e}`);
    } finally {
        await dbDisconnect();
        console.log("disconnected from database");
    }
}

main();
