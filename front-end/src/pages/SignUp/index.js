import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Container } from "./styles";
import api from "../../services/api";

function SignUp() {
  const [state, setState] = useState(
    {
      nome: "",
      email: "",
      cpf: "",
      senha: "",
    }
  );
  
  const navigate = useNavigate()

  const handleSignUp = e => {
    e.preventDefault();
    api.post("/professores", state).then().catch( (err) => console.log(err) )
    navigate("/")
  };


    return (
      <Container>
        <Form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => setState((prevState) => ({
              nome: e.target.value,
              ...prevState
            }))} 
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => setState((prevState) => ({
              email: e.target.value,
              ...prevState
            }))}
          />
           <input
            type="text"
            placeholder="CPF"
            onChange={e => setState((prevState) => ({
              cpf: e.target.value,
              ...prevState
            }))}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => setState((prevState) => ({
              senha: e.target.value,
              ...prevState
            }))}
          />
          <button type="submit">Cadastrar</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
}

export default SignUp;