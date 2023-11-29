import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

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

const Grid = ({ professores, setProfessores, setOnEdit }) => {

  const handleEdit = (item) => {
    // console.log(item);
    setOnEdit(item);
  }

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/professores/" + id)
      .then(({ data }) => {
        const newProfessores = professores.filter((professor) => professor.idprofessor !== id);

        setProfessores(newProfessores);
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
          <Th>Email</Th>
          <Th>CPF</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {professores.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.nome}</Td>
            <Td width="50%">{item.email}</Td>
            <Td width="20%">{item.cpf}</Td>
            <Td alignCenter width="5%">
              <FaEdit onClick={() => handleEdit(item)}/>
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.idprofessor)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default Grid;