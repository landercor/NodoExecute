
import { sequelize } from "./connection.js";

async function testConnection() {
    try {
        await sequelize.authenticate();

        console.log("Connection has been established successfully.");
        console.log("Database connection test passed.");
        console.log("Nodoexecute_DB");
        console.log("================================");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        console.log(error.message);

        process.exitCode = 1;

    } finally {
        await sequelize.close();
    }
}

testConnection();