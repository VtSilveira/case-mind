import JWT from "jsonwebtoken";

export const acesso = (req, res, next) => {
  const token = req.header.authentication.split(" ")[1];

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    // Adicionar os dados do usuário decodificados ao objeto de solicitação para uso posterior
    console.log(user)
    req.user = user;

    // Continue para a próxima camada de middleware ou rota
    next();
  });
}