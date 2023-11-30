import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container, Title } from "../SignIn/styles.js";
import GlobalStyle from "../../styles/global.js";
import api from "../../services/api.js";
import { login } from "../../services/auth.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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
    api
    .post("/professores", state)
    .then( (response) => {
      login(response.data.token);
      navigate("/Home");
    })
    .catch((err) => toast.error(err.response.data));
    
  };

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <Title>Fazer cadastro na plataforma</Title>
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
        <Link to="/SignIn">Fazer login</Link>
      </Form>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </Container>
  );
}

export default SignUp;