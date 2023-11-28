import mysql from "mysql"

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "7777",
  password: "vitor123",
  database: "case-mind"
});
