import React, { useState } from "react";
import Switch from "react-switch";
import styled from "styled-components";
import { toast } from "react-toastify";
import { getAcesso } from "../../../services/auth.js";
import api from "../../../services/api.js";
import { useNavigate } from "react-router-dom";
import { Edit, Image, Input } from "../styles.js";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.aligncenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

function searchComparison(nome, ref) {
  return nome.toUpperCase().includes(ref.toUpperCase())
}

const DEFAULT_IMG = "https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg";

const Grid = ({ cursos, setCursos }) => {
  const [ref, setRef] = useState("");
  const navigate = useNavigate();

  const handleEdit = (item) => {
    // navigate passando o item para o criar/editar curso
    // console.log({item})
    navigate("/CriarNovoCurso", { state: { edit: item } })
  }

  const handleVisibility = async (item) => {

    const {idcurso, visibilidade} = item;
    const novaVisibilidade = !visibilidade;

    api
      .put(`/cursos/visibilidade/${idcurso}`, {visibilidade: novaVisibilidade})
      .then(({ data }) => {
        const novosCursos = cursos.map((curso) => {
          if (curso.idcurso === idcurso)
            return {...curso, visibilidade: novaVisibilidade}

          return curso
        });

        setCursos(novosCursos);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
  }


  return (
    <>
    {getAcesso() === "admin" && (<Input 
      type="text"
      placeholder="Digite o nome do curso"
      onChange={ (e) => setRef(e.target.value)}
      value={ref}
    />)}
    <Table>
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Nome</Th>
          <Th>Categoria</Th>
          <Th>Descrição</Th>
          <Th>Responsável</Th>
          <Th>Ações</Th>
        </Tr>
      </Thead>
      <Tbody>
        {cursos.filter(curso => searchComparison(curso.nome, ref)).map((item, i) => (
          <Tr key={i}>
            <Td width="10%">
              <Image src={item.imagem || DEFAULT_IMG} alt=""/>
            </Td>
            <Td width="20%">{item.nome}</Td>
            <Td width="15%">{item.categoria}</Td>
            <Td width="30%">{item.descricao}</Td>
            <Td width="15%">{item.professor}</Td>
            <Td aligncenter width="5%">
              <Edit onClick={() => handleEdit(item)}/>

              {getAcesso() === 'admin' && (
                <Switch onChange={() => handleVisibility(item)} checked={item.visibilidade} onColor="#2c73d2"/>
            )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    </>
  );
}

export default Grid;