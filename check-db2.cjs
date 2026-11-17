const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "nodoexecute_db",
  password: "Admin123!@#321"
});
client.connect().then(() => {
  console.log("CONEXION EXITOSA a nodoexecute_db");
  return client.end();
}).catch(e => console.error("ERROR:", e.message));
