import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
  socket.on("autenticar_usuario", async ({ nome, senha }) => {
    const usuario = await encontrarUsuario(nome);

    if (!usuario) {
      socket.emit("usuario_inexistente");
      return;
    }

    const autenticado = autenticarUsuario(senha, usuario);
    
    if (autenticado) {
      const tokenJwt = gerarJwt({ nomeUsuario: nome });

      socket.emit("autenticacao_sucesso", tokenJwt);
    } else {
      socket.emit("autenticacao_erro");
    }
  });
}

export default registrarEventosLogin;