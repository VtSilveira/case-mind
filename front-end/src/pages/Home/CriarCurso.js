import GlobalStyle from "../../styles/global.js";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Container, Title } from "../SignIn/styles.js"; 
import { getToken } from "../../services/auth.js";
import api from "../../services/api.js";

const Cancel = styled.a`
  cursor: pointer;
`;

function CriarCurso() {
  const [state, setState] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    professor: "",
    imagem: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Dados do estado no momento do envio:", state);
    const token = getToken();

    if ( !state.nome ||
         !state.categoria ||
         !state.descricao ||
         !state.professor ||
         !state.imagem ) {

          return toast.warn("Preencha todos os campos!")
       }

    api
    .post("/cursos", state, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then( () => {
      toast.success("Curso criado com sucesso!")
    })
    .catch((err) => toast.error(err.response.data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>CRIAR NOVO CURSO</Title>
        <input
          type="text"
          name="nome"
          placeholder="Nome do curso"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoria do curso"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="descricao"
          placeholder="Descrição do curso"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="professor"
          placeholder="Professor responsável do curso"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="imagem"
          placeholder="Imagem"
          onChange={handleInputChange}
        />
        <button type="submit">Cadastrar</button>
        <hr />
        <Cancel onClick={() => navigate("/Home")}>Voltar</Cancel>
      </Form>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </Container>
  );
}

export default CriarCurso;