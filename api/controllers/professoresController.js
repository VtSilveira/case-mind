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
};

export const addProfessor = (req, res) => {
  const query = "INSERT INTO professor(`nome`, `email`, `cpf`) VALUES(?)"

  const values = [
    req.body.nome,
    req.body.email,
    req.body.cpf,
  ];

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor criado com sucesso.")
  });
};

export const updateProfessor = (req, res) => {
  const query = "UPDATE professor SET `nome` = ?, `email` = ?, `cpf` = ? WHERE `idprofessor` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.cpf,
  ];

  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor atualizado com sucesso.")
  })
}

export const deleteProfessor = (req, res) => {
  const query = "DELETE FROM professor WHERE `idprofessor` = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Professor deletado com sucesso.")
  })
}