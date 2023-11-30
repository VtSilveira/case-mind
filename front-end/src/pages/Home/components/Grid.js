import React from "react";

import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../../services/api.js"

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
    // console.log(item);
    setOnEdit(item);
  }

  const handleDelete = async (id) => {
    api
      .delete("/cursos/" + id)
      .then(({ data }) => {
        const newCursos = cursos.filter((curso) => curso.idcurso !== id);

        setCursos(newCursos);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));
    
    setOnEdit(null);
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Categoria</Th>
          <Th>Descrição</Th>
          <Th>Imagem</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {cursos.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.nome}</Td>
            <Td width="20%">{item.categoria}</Td>
            <Td width="20%">{item.descricao}</Td>
            <Td width="20%">{item.imagem}</Td>
            {/* <Td width="20%">{item.professor}</Td> */}
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)}/>
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idcurso)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Grid;