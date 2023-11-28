import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js"
import Grid from "./components/Grid.js"
import { toast, ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "axios";
//import "react-toastify/dist/ReactToastfy.css"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [professores, setProfessores] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProfessores = async () => {
    try { 
      const res = await axios.get("http://localhost:8800/professores")
      setProfessores(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    getProfessores();
  }, [setProfessores]);

  return (
    <>
      <Container>
        <Title> PROFESSORES </Title>
        <Form onEdit = { onEdit } setOnEdit = { setOnEdit } getProfessores = { getProfessores } />
        <Grid professores = { professores } setProfessores = { setProfessores } setOnEdit = { setOnEdit } />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;
