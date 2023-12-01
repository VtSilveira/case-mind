import GlobalStyle from "../../styles/global.js";
import Grid from "./components/Grid.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAcesso, getToken, logout } from "../../services/auth.js";
import api from "../../services/api.js";
import { Button, ContainerApp, LogOut, Title } from "./styles.js";

function Home() {
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

  const handleLogOut = () => {
    logout();
    navigate("/");
  }

  useEffect(() => {
    getCursos();
  }, [setCursos]);

  return (
    <>
      <ContainerApp>
      <LogOut onClick={() => handleLogOut()}>Sair</LogOut>
        <Title> CURSOS </Title>
        {getAcesso() === "professor" && (<Button onClick={() => navigate("/CriarNovoCurso",)}>Criar novo curso</Button>)}
        <Grid cursos={ cursos } setCursos={ setCursos } />
      </ContainerApp>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default Home;
