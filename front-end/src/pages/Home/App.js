import GlobalStyle from "../../styles/global.js";
import styled from "styled-components";
import Grid from "./components/Grid.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getAcesso, getToken } from "../../services/auth.js";
import api from "../../services/api.js";

const Container = styled.div`
  width: 1600px;
  max-width: 1600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

function App() {
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  const getCursos = async () => {
    try { 
      const token = getToken();
      const acesso = getAcesso();

      const ENDPOINT = acesso === "admin" ? "/cursos" : "/cursos/professor";

      const res = await api.get(ENDPOINT, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setCursos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getCursos();
  }, [setCursos]);

  return (
    <>
      <Container>
        <Title> CURSOS </Title>
        <Button onClick={() => navigate("/CriarNovoCurso",)}>Criar novo curso</Button>
        <Grid cursos={ cursos } setCursos={ setCursos } />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
