const mongoose = require("mongoose");

const { Schema } = mongoose;

const dbConnectTimeout = 5000;

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
const Teacher = new mongoose.model("teachers", teacherSchema);

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
            },
        );
        console.log("connected to database");

        let t1 = new Teacher({
            shortcut: "KON",
            lastname: "Kofler",
            numberOfSubjects: 5,
        });
        await t1.save();
        console.log("t1 saved!");

        let t2 = new Teacher();
        t2.shortcut = "KAA";
        t2.lastname = "Karasek";
        t2.numberOfSubjects = 3;
        await t2.save();
        console.log("t2 saved!");
    } catch (e) {
        console.error(`error connecting to database: ${e}`);
    } finally {
        await dbDisconnect();
        console.log("disconnected from database");
    }
}

main();
