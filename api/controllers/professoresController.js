import { db } from "../db.js";
import * as bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const getProfessores = (_, res) => {
  const query = "SELECT * FROM professor";

  db.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err);
    }

    // console.log(data)
    return res.status(200).json(data);
  });
};

export const addProfessor = (req, res) => {
  const query = "INSERT INTO professor(`nome`, `email`, `cpf`, `senha`, `acesso`) VALUES(?)"
  const acesso = "professor";

  if (!(/^\d{11}$/.test(req.body.cpf)))
    return res.status(400).json("CPF inválido")

  const values = [
    req.body.nome,
    req.body.email,
    req.body.cpf,
    bcrypt.hashSync(req.body.senha, 12),
    acesso,
  ];

  db.query(query, [values], (err, results) => {
    if (err) return res.json(err);

    var token = JWT.sign({ 
      idprofessor: results.insertId,
      acesso: acesso
     }, process.env.JWT_SECRET, {
      expiresIn: '3h'
     });

    return res.status(200).json({ token, acesso })
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

export const Login = (req, res) => {
  const query = "SELECT * FROM professor WHERE `email` = ?";

  db.query(query, [req.body.email], (err, results) => {
    if (err) return res.json(err);

    // console.log(results[0].senha);

    if (!bcrypt.compareSync(req.body.senha, results[0].senha))
      return res.status(401).json("Login não autorizado!")

    var token = JWT.sign({ 
      idprofessor: results[0].idprofessor,
      acesso: results[0].acesso
     }, process.env.JWT_SECRET, {
      expiresIn: '3h'
     });

    return res.status(200).json({ token, acesso: results[0].acesso })
  })
}