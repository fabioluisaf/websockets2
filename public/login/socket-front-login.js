import { definirCookie } from "../utils/cookies.js";

const socket = io();

function emitirAutenticarUsuario(dados) {
  socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
  definirCookie("tokenJwt", tokenJwt);
  alert("Usuario autenticado com sucesso");
  window.location.href = "/";
});

socket.on("autenticacao_erro", () => alert("Erro na autenticacao"));
socket.on("usuario_inexistente", () => alert("Usuario nao existe"));

export { emitirAutenticarUsuario };