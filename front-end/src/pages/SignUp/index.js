import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container } from "./styles";
import api from "../../services/api";

function SignUp() {
  const [state, setState] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // console.log("Dados do estado no momento do envio:", state);
    api.post("/professores", state).then().catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <input
          type="text"
          name="nome"
          placeholder="Nome de usuário"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Endereço de e-mail"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleInputChange}
        />
        <button type="submit">Cadastrar</button>
        <hr />
        <Link to="/">Fazer login</Link>
      </Form>
    </Container>
  );
}

export default SignUp;