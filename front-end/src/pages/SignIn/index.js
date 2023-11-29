import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Title } from "./styles.js";
import api from "../../services/api";
import GlobalStyle from "../../styles/global";

function SignIn() {
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

  const handleSignIn = (e) => {
    e.preventDefault();
    // console.log("Dados do estado no momento do envio:", state);
    api.post("/professores", state).then().catch((err) => console.log(err));
    navigate("/");
  };

  return (
    <Container>
      <Form onSubmit={handleSignIn}>
        <Title>Fazer Log-in na plataforma</Title>
        <input
          type="email"
          name="email"
          placeholder="Endereço de e-mail"
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          onChange={handleInputChange}
        />
        <button type="submit">Fazer Login</button>
        <hr />
        <span>Ainda não possui cadastro?</span> 
        <Link to="/SignUp">Clique aqui para cadastrar</Link>
      </Form>
      <GlobalStyle />
    </Container>
  );
}

export default SignIn;