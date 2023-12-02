import GlobalStyle from "../../styles/global.js";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Container, Title, Delete } from "./styles.js"; 
import { getToken } from "../../services/auth.js";
import api from "../../services/api.js";

const Cancel = styled.a`
  cursor: pointer;
`;

function CursoForms({ onEdit, setOnEdit }) {

  const location = useLocation();
  const navigate = useNavigate();
  // ver se o locantion tem alguma coisa, se tiver é edit, se nao é create

  const [state, setState] = useState({
    nome: "",
    categoria: "",
    descricao: "",
    professor: "",
    imagem: "",
  });

  useEffect(() => {
    // console.log(location.state.edit);

    if (location.state?.edit) {
      const { idcurso, idprofessor, visibilidade, ...rest } = location.state.edit;
      console.log(rest);
      setState(rest);
    }
   
  }, [location])

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

    if ( !state.nome || !state.categoria || !state.descricao || !state.professor || !state.imagem ) {
      return toast.warn("Preencha todos os campos!")
    }
    
    if (location.state?.edit) {
      console.log(location.state.edit.idcurso, state);

      api
        .put(`/cursos/${location.state.edit.idcurso}`, state)
        .then( () => {
          toast.success("Curso atualizado com sucesso!")
        })
        .catch((err) => toast.error(err.response.data));
    } else {

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
  }

  const handleDelete = () => {
    api
      .delete(`/cursos/${location.state.edit.idcurso}`)
      .then( () => {
        toast.success("Curso deletado com sucesso!")
      })
      .catch((err) => toast.error(err.response.data));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>{location.state?.edit ? "EDITAR CURSO" : "CRIAR NOVO CURSO"}</Title> 
        <div className="input-label">
          <label> Nome: </label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do curso"
            onChange={handleInputChange}
            value={state.nome}
          />
        </div>
        
        <div className="input-label">
          <label> Categoria: </label>
          <input
            type="text"
            name="categoria"
            placeholder="Categoria do curso"
            onChange={handleInputChange}
            value={state.categoria}
          />
        </div>

        <div className="input-label">
          <label> Descrição: </label>
          <input
            type="text"
            name="descricao"
            placeholder="Descrição do curso"
            onChange={handleInputChange}
            value={state.descricao}
          />
        </div>
        
        <div className="input-label">
          <label> Professor: </label>
          <input
            type="text"
            name="professor"
            placeholder="Professor responsável do curso"
            onChange={handleInputChange}
            value={state.professor}
          />
        </div>
        
        <div className="input-label">
          <label> Imagem: </label>
          <input
            type="text"
            name="imagem"
            placeholder="Insira a URL da imagem"
            onChange={handleInputChange}
            value={state.imagem}
          />
        </div>
        
        {location.state?.edit && <Delete onClick={() => handleDelete()}>Excluir Curso</Delete>}

        <button type="submit">{location.state?.edit ? "Salvar" : "Cadastrar"}</button>
        <hr />
        <Cancel onClick={() => navigate("/Home")}>Voltar</Cancel>
      </Form>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </Container>
  );
}

export default CursoForms;