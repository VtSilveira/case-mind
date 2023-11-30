import JWT from "jsonwebtoken";

export const autenticacao = (req, res, next) => {
  if (!req.headers.authorization.lenght)
    return res.status(403).json('Faltando token!');

  const token = req.headers.authorization.split(" ")[1];

  JWT.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    console.log(user)
    req.user = user;

    next();
  });
}