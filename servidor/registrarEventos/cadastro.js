import { cadastrarUsuario, encontrarUsuario } from "../db/usuariosDb.js";

function registrarEventosCadastro(socket, io) {
  socket.on("cadastrar_usuario", async (dados) => {
    const usuarioJaExiste = (await encontrarUsuario(dados.nome)) !== null;

    if (usuarioJaExiste) {
      socket.emit("usuario_existente");
      return;
    }

    const resultado = await cadastrarUsuario(dados);
    
    if (!resultado.acknowledged) {
      socket.emit("cadastro_erro");
      return;
    }

    socket.emit("cadastro_sucesso");
  });
}

export default registrarEventosCadastro;