import JWT from "jsonwebtoken";

export const acesso = (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(403).json('Faltando token!');

  const token = req.headers.authorization.split(" ")[1];

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json('Token inválido');
    }

    // Adicionar os dados do usuário decodificados ao objeto de solicitação para uso posterior
    if (user.acesso !== "admin")
      return res.status(401).json("Acesso negado!");
    
    // Continue para a próxima camada de middleware ou rota
    next();
  });
}