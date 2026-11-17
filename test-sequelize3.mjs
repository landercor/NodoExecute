import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DBDIALECT || "postgres",
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
        },
    }
);

try {
    await sequelize.authenticate();
    console.log("CONEXION EXITOSA");
    process.exit(0);
} catch (e) {
    console.error("ERROR:", e.message);
    console.error("ORIGINAL:", e.original?.message);
    process.exit(1);
}
