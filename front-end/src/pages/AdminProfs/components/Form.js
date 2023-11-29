import React, { useRef, useEffect } from "react";
import styled from "styled-components"
import axios from "axios";
import { toast } from "react-toastify"

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getProfessores, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const professor = ref.current;

      // console.log(onEdit)

      professor.nome.value = onEdit.nome;
      professor.email.value = onEdit.email;
      professor.cpf.value = onEdit.cpf;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const professor = ref.current;

    if (
      !professor.nome.value ||
      !professor.email.value ||
      !professor.cpf.value ||
      !professor.senha.value
    ) {
      return toast.warn("Preencha todos os campos!")
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/professores/" + onEdit.idprofessor, {
          nome: professor.nome.value,
          email: professor.email.value,
          cpf: professor.cpf.value,
          senha: professor.senha.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/professores", {
          nome: professor.nome.value,
          email: professor.email.value,
          cpf: professor.cpf.value,
          senha: professor.senha.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    professor.nome.value = "";
    professor.email.value = "";
    professor.cpf.value = "";
    professor.senha.value = "";

    setOnEdit(null)
    getProfessores();
  };

  return (
    <FormContainer ref = { ref } onSubmit = { handleSubmit }>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf" />
      </InputArea>
      <InputArea>
        <Label>Senha</Label>
        <Input name="senha" />
      </InputArea>

      <Button type = "submit">SALVAR</Button>
    </FormContainer>
  );
}

export default Form