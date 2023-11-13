const { mongoose } = require("mongoose");

/**
 *
 * @param {string} connectionString
 * @param {boolean | undefined} recreateDatabase
 */
async function setupDBConnection(connectionString, recreateDatabase) {
    try {
        const dbConnectTimeout = 5000;

        // BTW... bad practice to log connection strings including passwords ...
        console.log(`DB - Setting up connection using ${connectionString}`);

        if (recreateDatabase) {
            let connection = null;

            connection = await mongoose
                .createConnection(connectionString, {
                    serverSelectionTimeoutMS: dbConnectTimeout,
                })
                .asPromise();
            await connection.dropDatabase();

            console.log("DB - current database dropped !!");
        }

        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: dbConnectTimeout,
        });

        console.log(`DB - Connection to ${connectionString} established.`);
    } catch (err) {
        console.log("DB - Unable to setup connection... " + err.message);
        process.exit(1);
    }
}

module.exports = { setupDBConnection };
