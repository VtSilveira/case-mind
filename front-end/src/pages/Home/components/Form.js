import React, { useRef, useEffect } from "react";
import styled from "styled-components"
import api from "../../../services/api.js"
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

const Form = ({ getCursos, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const curso = ref.current;

      // console.log(onEdit)

      curso.nome.value = onEdit.nome;
      curso.categoria.value = onEdit.categoria;
      curso.decricao.value = onEdit.decricao;
      curso.imagem.value = onEdit.imagem;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const curso = ref.current;

    if (
      !curso.nome.value ||
      !curso.categoria.value ||
      !curso.descricao.value ||
      !curso.imagem.value
    ) {
      return toast.warn("Preencha todos os campos!")
    }

    if (onEdit) {
      api
        .put("/cursos/" + onEdit.idcurso, {
          nome: curso.nome.value,
          categoria: curso.categoria.value,
          descricao: curso.descricao.value,
          imagem: curso.imagem.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      api
        .post("/cursos", {
          nome: curso.nome.value,
          categoria: curso.categoria.value,
          descricao: curso.descricao.value,
          imagem: curso.imagem.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    curso.nome.value = "";
    curso.categoria.value = "";
    curso.descricao.value = "";
    curso.imagem.value = "";

    setOnEdit(null)
    getCursos();
  };

  return (
    <FormContainer ref = { ref } onSubmit = { handleSubmit }>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Categoria</Label>
        <Input name="categoria" />
      </InputArea>
      <InputArea>
        <Label>Descrição</Label>
        <Input name="descricao" />
      </InputArea>
      <InputArea>
        <Label>Imagem</Label>
        <Input name="imagem" />
      </InputArea>

      <Button type = "submit">SALVAR</Button>
    </FormContainer>
  );
}

export default Form