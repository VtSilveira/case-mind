import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vitor123",
  database: "case-mind"
});

console.log(db);