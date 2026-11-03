import "dotenv/config";

import app from "./src/app.js";
import { sequelize } from "./src/infrastructure/database/connection.js";

const PORT = Number(process.env.PORT) || 3000;

let server;

async function startServer() {
    try {
        // Comprobar conexión con PostgreSQL
        await sequelize.authenticate();

        console.log("Conexión con PostgreSQL establecida.");

        // Iniciar servidor HTTP
        server = app.listen(PORT, () => {
            console.log("NodoExecute");
            console.log("Servidor iniciado correctamente.");
            console.log(`URL: http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("No se pudo iniciar NodoExecute:");
        console.error(error.message);

        process.exitCode = 1;
    }
}

// Cierre controlado del servidor
async function shutdown(signal) {
    console.log(`\nRecibida señal ${signal}. Cerrando servidor...`);

    if (server) {
        await new Promise((resolve) => {
            server.close(resolve);
        });
    }

    await sequelize.close();

    console.log("NodoExecute detenido correctamente.");
    process.exit(0);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();