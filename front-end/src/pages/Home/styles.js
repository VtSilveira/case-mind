import styled from "styled-components";
import { FaEdit } from "react-icons/fa";

export const Edit = styled(FaEdit).attrs({
  size: 20, 
  color: "#2c73d2"
})`
  cursor: pointer;
`;

export const Title = styled.h2`
  margin-bottom: 10px;
`;

export const ContainerApp = styled.div`
  width: 1600px;
  max-width: 1600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const LogOut = styled.button`
  padding: 8px 16px;
  margin-top: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: red;
  color: white;
  height: 42px;
  align-self: flex-end;
  margin-right: 240px;
`;

export const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #2c73d2 !important;
  outline: none;
  border-radius: 7px;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Image = styled.img`
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  border-radius: 10px;
`;
export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 60px;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding-left: 3%;
    color: #777;
    font-size: 15px;
    width: 97%;
    border: 1px solid #ddd;
    &::placeholder {
      color: gray;
      opacity: 0.5;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #2c73d2;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
  label {
    align-self: start;
  }
  .input-label {
    width: 100%;
    margin: 0 auto;
  }
`;