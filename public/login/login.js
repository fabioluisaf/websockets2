import { emitirAutenticarUsuario } from "./socket-front-login.js";

const formDOM = document.getElementById("form-login");

formDOM.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = formDOM["input-usuario"].value;
  const senha = formDOM["input-senha"].value;

  emitirAutenticarUsuario({ nome, senha });
});