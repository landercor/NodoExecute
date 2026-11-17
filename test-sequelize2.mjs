import pkg from "sequelize";
const { Sequelize } = pkg;

const sequelize = new Sequelize(
  "nodoexecute_db",
  "postgres",
  "Admin123!@#321",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

try {
  await sequelize.authenticate();
  console.log("CONEXION EXITOSA con sequelize");
  process.exit(0);
} catch (e) {
  console.error("ERROR:", e.message);
  console.error("ORIGINAL:", e.original?.message);
  process.exit(1);
}
