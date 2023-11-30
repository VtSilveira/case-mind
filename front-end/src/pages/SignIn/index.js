import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Title } from "./styles.js";
import api from "../../services/api.js";
import { login } from "../../services/auth.js";
import GlobalStyle from "../../styles/global.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const [state, setState] = useState({
    email: "",
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

    api
    .post("/professores/Login", state)
    .then( (response) => {
      login(response.data.token);
      navigate("/Home");
    })
    .catch((err) => toast.error("Erro: Email ou senha incorretos."));
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
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </Container>
  );
}

export default SignIn;