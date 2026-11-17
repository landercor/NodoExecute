import "dotenv/config";
import pkg from "sequelize";
const { Sequelize } = pkg;

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DBDIALECT || "postgres",
        logging: true,
    }
);

try {
    await sequelize.authenticate();
    console.log("CONEXION EXITOSA");
    process.exit(0);
} catch (e) {
    console.error("ERROR:", e.message);
    console.error("CODE:", e.code);
    console.error("ORIGINAL:", e.original);
    process.exit(1);
}
