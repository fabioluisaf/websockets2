import { emitirCadastrarUsuario } from "./socket-front-cadastro.js";

const formDOM = document.getElementById("form-cadastro");

formDOM.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = formDOM["input-usuario"].value;
  const senha = formDOM["input-senha"].value;

  emitirCadastrarUsuario({ nome, senha });
});