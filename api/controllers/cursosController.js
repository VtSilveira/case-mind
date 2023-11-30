import { db } from "../db.js";


export const getCursos = (_, res) => {
  const query = "SELECT * FROM curso";

  db.query(query, (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err);
    }

    console.log(data)
    return res.status(200).json(data);
  });
};

export const getCursosPorProfessor = (req, res) => {
  const query = "SELECT * FROM curso WHERE `idprofessor` = ?";

  db.query(query, [req.user.idprofessor], (err, data) => {
    if (err) {
      console.log(err)
      return res.json(err);
    }

    console.log(data)
    return res.status(200).json(data);
  });
};

export const addCurso = (req, res) => {
  const query = "INSERT INTO curso(`nome`, `categoria`, `descricao`, `imagem`, `idprofessor`) VALUES(?)"

  const values = [
    req.body.nome,
    req.body.categoria,
    req.body.descricao,
    req.body.imagem,
    req.user.idprofessor,
  ];

  db.query(query, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Curso adicionado com sucesso!")
  });
};

export const updateCurso = (req, res) => {
  const query = "UPDATE curso SET `nome` = ?, `categoria` = ?, `descricao` = ?, `imagem` = ? WHERE `idcurso` = ?";

  const values = [
    req.body.nome,
    req.body.categoria,
    req.body.descricao,
    req.body.imagem,
  ];

  db.query(query, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Curso atualizado com sucesso.")
  })
}

export const deleteCurso = (req, res) => {
  const query = "DELETE FROM curso WHERE `idcurso` = ?";

  db.query(query, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Curso deletado com sucesso.")
  })
}