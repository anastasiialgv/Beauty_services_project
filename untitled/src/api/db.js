import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "232365",
  database: "beauty_services",
});

db.connect((err) => {
  if (err) console.log("Error connection to database" + err);
  else console.log("Connected to database");
});

export default db;
