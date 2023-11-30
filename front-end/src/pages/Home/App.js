import GlobalStyle from "../../styles/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getToken } from "../../services/auth.js";

const Container = styled.div`
  width: 1400px;
  max-width: 1400px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [cursos, setCursos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getCursos = async () => {
    try { 
      // logado como ADM
      const token = getToken();
      const res = await axios.get("http://localhost:8800/cursos", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(res);
      setCursos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      // sem estar logado como ADM
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
        <Form onEdit = { onEdit } setOnEdit = { setOnEdit } getcursos = { getCursos } />
        <Grid cursos = { cursos } setCursos = { setCursos } setOnEdit = { setOnEdit } />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
