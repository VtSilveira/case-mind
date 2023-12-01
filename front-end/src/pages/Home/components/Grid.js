import React from "react";
import Switch from "react-switch";
import styled from "styled-components";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAcesso } from "../../../services/auth.js";
import api from "../../../services/api.js";

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
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ cursos, setCursos, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
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
    
    setOnEdit(null);
  }


  return (
    <Table>
      <Thead>
        <Tr>
          <Th></Th>
          <Th>Nome</Th>
          <Th>Categoria</Th>
          <Th>Descrição</Th>
          <Th>Responsável</Th>
          <Th></Th>
          {getAcesso() === 'admin' && <Th>Ativar/Desativar</Th>}
        </Tr>
      </Thead>
      <Tbody>
        {cursos.map((item, i) => (
          <Tr key={i}>
            <Td width="15%">{item.imagem}</Td>
            <Td width="20%">{item.nome}</Td>
            <Td width="20%">{item.categoria}</Td>
            <Td width="20%">{item.descricao}</Td>
            <Td width="15%">{item.professor}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)}/>
            </Td>
            <Td alignCenter width="5%">
            {getAcesso() === 'admin' && (
                <Switch onChange={() => handleVisibility(item)} checked={item.visibilidade} />
            )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Grid;