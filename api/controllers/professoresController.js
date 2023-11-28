import { db } from "../db.js";

export const getProfessores = (_, res) => {
  const query = "SELECT * FROM professor";

  db.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err);
    }

    console.log(data)
    return res.status(200).json(data);
  });
}