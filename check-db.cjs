const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "postgres",
  password: "Admin123!@#321"
});
client.connect().then(() => {
  return client.query("SELECT datname FROM pg_database WHERE datname ILIKE '%nodo%' ORDER BY datname");
}).then(r => {
  console.log("Bases de datos con 'nodo':");
  r.rows.forEach(row => console.log(" -", row.datname));
  return client.end();
}).catch(e => console.error("ERROR:", e.message));
