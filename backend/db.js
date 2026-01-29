import mysql from "mysql2/promise";

 const db = mysql.createPool({
  host: "mysql",       // MySQL service name
  user: "appuser",     // must match MYSQL_USER
  password: "14800121045", // must match MYSQL_PASSWORD
  database: "authdb", // must match MYSQL_DATABASE
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
export default db;